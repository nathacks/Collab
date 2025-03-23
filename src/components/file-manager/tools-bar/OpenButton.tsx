import { Button } from '@/components/ui/button'
import { Eye, Folder } from 'lucide-react';
import { useDataTableStore } from '@/stores/dataTable.store.ts';
import { useRouter } from 'next/navigation';


export function OpenButton() {
    const { rowSelectionData, resetRowSelection } = useDataTableStore();
    const router = useRouter()

    const fileOrFolder = rowSelectionData()[0]

    const handleOpenFolder = async () => {
        router.push(`./file-manager?folder=${fileOrFolder.id}`)
    }

    const handleOpenFile = () => {
        resetRowSelection()
        router.push(`./file-manager/${fileOrFolder.id}`)
    };

    return (
        <Button onClick={fileOrFolder.type === 'FILE' ? handleOpenFile : handleOpenFolder}
                icon={fileOrFolder.type === 'FILE' ? <Eye/> : <Folder/>}>Open</Button>
    )
}
