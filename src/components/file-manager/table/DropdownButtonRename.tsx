import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Pen } from 'lucide-react';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { RenameFileFolderForm } from '@/components/forms/RenameFileFolderForm';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';

interface DropdownButtonDeleteProps {
    fileOrFolder: FileWithOwnerAndOmit
}

export function DropdownButtonRename({ fileOrFolder }: DropdownButtonDeleteProps) {
    const { openDialog } = useConfirmationDialogStore()

    return (
        <DropdownMenuItem onClick={() => {
            openDialog({
                title: `Rename ${fileOrFolder?.type === 'FILE' ? 'File' : 'Folder'}`,
                description: 'Please enter a new name. Make sure it is unique and follows naming conventions.',
                content: <RenameFileFolderForm fileFolderToRename={fileOrFolder}/>
            })
        }}>
            <Pen/>Rename
        </DropdownMenuItem>
    )
}
