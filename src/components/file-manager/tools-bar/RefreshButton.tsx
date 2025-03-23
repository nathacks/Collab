import { Button } from '@/components/ui/button'
import { RefreshCwIcon } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceParams';
import { useGetFolder } from '@/hooks/api/getFolder';
import { useSearchParams } from 'next/navigation';

export function RefreshButton() {
    const { workspaceId } = useWorkspace();
    const getFileFolder = useGetFolder()
    const searchParams = useSearchParams()

    const folderId = searchParams.get('folder');

    const handleClick = () => getFileFolder(workspaceId, folderId)

    return (
        <Button className={'px-3 group'}
                icon={<RefreshCwIcon/>}
                onClick={handleClick}/>
    )
}
