import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateFolderFormSchema } from '@/schemas/file-manager.schema';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useFileManagerStore } from '@/stores/files.store';
import { onSubmitCreateFolderAction } from '@/actions/file-manager/createFolder.action';
import { useWorkspace } from '@/context/WorkspaceParams';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { useSearchParams } from 'next/navigation';

export function CreateFolderForm() {
    const { addFileFolder, filesFolders } = useFileManagerStore()
    const { workspaceId } = useWorkspace();
    const { closeDialog } = useConfirmationDialogStore();

    const searchParams = useSearchParams()
    const folderId = searchParams.get('folder');

    const boundCreateFolderAction = onSubmitCreateFolderAction.bind(null, workspaceId, folderId)

    const foldersOnly = filesFolders.children.filter((filesFolder) => filesFolder.type === 'FOLDER')

    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(boundCreateFolderAction, zodResolver(CreateFolderFormSchema(foldersOnly)), {
        formProps: {
            defaultValues: {
                name: '',
            }
        },
        actionProps: {
            onSuccess: ({ data }) => {
                if (data) addFileFolder(data)
                closeDialog()
            }
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className={'flex flex-col gap-5'}>
                <div className={'flex flex-row'}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className={'flex-1 z-10'}>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className={'flex'}>
                    <DialogClose asChild>
                        <Button disabled={action.isPending} variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button loading={action.isPending} type="submit">Create</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
