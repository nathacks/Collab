'use client'

import { MinimalTiptapEditor } from '@/components/ui/minimal-tiptap';
import { Content } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { usePermissionRole } from '@/hooks/usePermissionRole';
import { useAction } from 'next-safe-action/hooks';
import { onWriteFileAction } from '@/actions/file-manager/writeFile.action';
import { useWorkspace } from '@/context/WorkspaceParams';
import { File as FileInfo } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { sanitizeContent } from '@/utils/sanitizeContent';

export function EditorText({ file, content }: { file: FileInfo, content: string }) {
    const initialContent = content ? JSON.parse(content) : { type: 'doc', content: [] };
    const [value, setValue] = useState<Content>(initialContent);
    const [isSaving, setIsSaving] = useState(false);

    const { workspaceId } = useWorkspace();
    const isPermission = usePermissionRole(1);

    const boundWriteFile = onWriteFileAction.bind(null, workspaceId, file.id);
    const { executeAsync } = useAction(boundWriteFile);


    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const sanitizedValue = JSON.stringify(sanitizeContent(value));
        const sanitizedInitial = JSON.stringify(sanitizeContent(initialContent));

        if (!value || sanitizedValue === sanitizedInitial) return;

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            setIsSaving(true);
            await executeAsync({ content: sanitizeContent(value) });
            setIsSaving(false);
        }, 500);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [value]);


    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isSaving) {
                event.preventDefault();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSaving]);

    return (
        <div className="flex flex-1 relative">
            {isSaving && (
                <div className="absolute top-0 m-3 flex right-0 items-center flex-1 gap-2 ">
                    <Loader2 className="animate-spin w-4 h-4"/>
                    <span>Saving...</span>
                </div>
            )}
            <MinimalTiptapEditor
                value={value}
                onChange={setValue}
                editorContentClassName="p-5"
                output="json"
                immediatelyRender={false}
                placeholder="Enter your text here..."
                autofocus={true}
                editable={!isSaving && isPermission}
            />
        </div>
    );
}
