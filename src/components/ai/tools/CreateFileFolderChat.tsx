import { cn } from '@/lib/utils';
import { ChevronRight, CircleX, File, Folder } from 'lucide-react';
import { ToolInvocation } from 'ai';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


interface ToolInvocationResult {
    data: FileWithOwnerAndOmit
    error: any;
}

export function CreateFileFolderChat({ toolInvocation, onClose }: {
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
            <div className={cn('self-start bg-muted rounded-2xl rounded-bl-md px-4 py-2')}>
                {data ? (
                    <div className={'flex flex-col gap-2'}>
                        <Button onClick={() => handleClick(data)} icon={data.type === 'FILE' ? <File/> : <Folder/>}
                                variant={'outline'}
                                className={'p-2 self-start'}>
                            <div className={'flex items-center gap-12'}>
                                <span>{data.name}{data.extension}</span>
                                <ChevronRight/>
                            </div>
                        </Button>
                        <span>{data.type === 'FILE' ? 'File' : 'Folder'} successfully created 👍</span>
                    </div>
                ) : (
                    <span className={'flex flex-row gap-2 items-center'}><CircleX/>{error}</span>
                )}
            </div>
        );
    }

    if (state === 'partial-call') {
        return <pre>{JSON.stringify(toolInvocation, null, 2)}</pre>;
    }

    if (state === 'call') return <Skeleton className="h-10 w-32 rounded-md"/>;
}
