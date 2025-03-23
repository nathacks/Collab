import { notFound } from 'next/navigation';
import { getFileOrFolderById } from '@/services/file-manager/file.service';
import { EditorText } from '@/components/file-manager/editFile/EditorText';
import { FC } from 'react';
import { File as FileInfo } from '@prisma/client';
import { readFileFS } from '@/services/file-manager/fileManager.service';

const fileComponents: Record<string, FC<{ file: FileInfo, content: any }>> = {
    '.txt': EditorText
};

export default async function FilePage({ params }: { params: Promise<{ fileId: string, workspaceId: string }> }) {
    const { fileId, workspaceId } = await params;
    const file = await getFileOrFolderById(workspaceId, fileId);

    if (!file || !file.extension || !fileComponents[file.extension]) notFound();

    const contentFile = await readFileFS(file.path)

    const Component = fileComponents[file.extension];

    return (
        <div className="flex h-full">
            <Component file={file} content={contentFile}/>
        </div>
    );
}
