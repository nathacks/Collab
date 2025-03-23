import { Button } from '@/components/ui/button'
import { MoveUp } from 'lucide-react';
import { useFileManagerStore } from '@/stores/files.store';
import { useRouter } from 'next/navigation';

export function PreviousFolderButton() {
    const { filesFolders } = useFileManagerStore();
    const router = useRouter()

    const handleClick = async () => {
        router.push(`./file-manager${filesFolders.parent?.parentId ? `?folder=${filesFolders.parent.parentId}` : ''}`)
    }

    return (
        <Button className={'px-3 group'} disabled={!filesFolders.parent}
                icon={<MoveUp/>}
                onClick={handleClick}/>
    )
}
