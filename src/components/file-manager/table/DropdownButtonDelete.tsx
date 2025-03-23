import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash } from 'lucide-react';
import { useAlertConfirmationDialogStore } from '@/stores/alertConfirmationDialog.store';
import { useDeleteFileFolder } from '@/hooks/action/useDeleteFileFolder';

interface DropdownButtonDeleteProps {
    fileOrFolderId: string[]
}

export function DropdownButtonDelete({ fileOrFolderId }: DropdownButtonDeleteProps) {
    const {
        openAlertDialog,
    } = useAlertConfirmationDialogStore();

    const onSubmitDeleteFileFolder = useDeleteFileFolder(fileOrFolderId)

    return (
        <DropdownMenuItem onClick={() => {
            openAlertDialog({
                title: 'Are you sure you want to delete?',
                description: 'This action cannot be undone. Deleting this data will permanently remove.',
                cancelLabel: 'Cancel',
                actionLabel: 'Delete',
                onAction: onSubmitDeleteFileFolder,
            })
        }} className="text-destructive focus:bg-destructive">
            <Trash/>Delete
        </DropdownMenuItem>
    )
}
