import { ChevronRight, CircleX, File, Folder } from 'lucide-react';
import { ToolInvocation } from 'ai';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';


interface ToolInvocationResult {
    data: FileWithOwnerAndOmit
    error: any;
}

export function CreateFileFolderCommand({ toolInvocation, onClose }: {
    toolInvocation: ToolInvocation, onClose: () => void;
}) {
    const { state } = toolInvocation;
    const router = useRouter()

    const handleClick = (data: FileWithOwnerAndOmit) => {
        onClose();
        if (data.type === 'FOLDER') {
            router.push(`./file-manager?folder=${data.id}`)
        } else {
            router.push(`./file-manager/${data.id}`)
        }
    }

    if (state === 'result') {
        const { result: { data, error } }: { result: ToolInvocationResult } = toolInvocation;

        return (
            <div>
                {data ? (
                    <div className={'flex flex-col gap-2'}>
                        <CommandItem onSelect={() => handleClick(data)}>
                            <div className={'flex flex-1 justify-between'}>
                                <div className={'flex items-center gap-2'}>
                                    <span className={'flex gap-2'}>{data.type === 'FILE' ? <File/> :
                                        <Folder/>} {data.name}{data.extension}</span>
                                    <Badge
                                        variant="secondary"
                                        className="text-xs h-4 flex items-center pointer-events-none"
                                    >
                                        {data.type === 'FILE' ? 'File' : 'Folder'} successfully created
                                    </Badge>
                                </div>
                                <ChevronRight/>
                            </div>
                        </CommandItem>
                    </div>
                ) : (
                    <span className={'flex text-sm m-2 flex-row gap-2 items-center [&>svg]:size-4'}><CircleX/>{error}</span>
                )}
            </div>
        );
    }

    if (state === 'partial-call') {
        return <pre>{JSON.stringify(toolInvocation, null, 2)}</pre>;
    }

    if (state === 'call') return <Skeleton className="h-11 rounded-md"/>;
}
