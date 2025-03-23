import { toast } from 'sonner';
import { useWorkspace } from '@/context/WorkspaceParams';
import { onSubmitDeleteFileFolderAction } from '@/actions/file-manager/deleteFileFolder.action';
import { useAction } from 'next-safe-action/hooks';
import { useFileManagerStore } from '@/stores/files.store';
import { useDataTableStore } from '@/stores/dataTable.store.ts';

export function useDeleteFileFolder(dataToDelete?: string[]) {
    const { workspaceId } = useWorkspace();
    const { rowSelectionData } = useDataTableStore();
    const { deleteFilesFolders } = useFileManagerStore()

    const boundDeleteFileFolder = onSubmitDeleteFileFolderAction.bind(null, workspaceId)

    const { executeAsync } = useAction(boundDeleteFileFolder);

    return async () => {
        const result = await executeAsync(dataToDelete ?? rowSelectionData('id'))

        if (result?.validationErrors?._errors) {
            toast.error(result.validationErrors?._errors);
        }

        if (result?.data) {
            toast.success('Your data has been successfully deleted.')
            deleteFilesFolders(result.data)
        }
    }
}
