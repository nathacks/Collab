'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { RenameFileFolderFormSchema } from '@/schemas/file-manager.schema';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { onSubmitRenameFileFolderAction } from '@/actions/file-manager/renameFileFolder.action';
import { useFileManagerStore } from '@/stores/files.store';
import { useWorkspace } from '@/context/WorkspaceParams';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { useDataTableStore } from '@/stores/dataTable.store.ts';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';

interface RenameFileFolderFormProps {
    fileFolderToRename?: FileWithOwnerAndOmit
}


export function RenameFileFolderForm({ fileFolderToRename }: RenameFileFolderFormProps) {
    const { replaceFileFolder } = useFileManagerStore()
    const { rowSelectionData } = useDataTableStore();
    const { workspaceId } = useWorkspace();
    const { closeDialog } = useConfirmationDialogStore();

    const selectedFileOrFolder = fileFolderToRename ?? rowSelectionData()[0]


    const boundRenameFileFolderAction = onSubmitRenameFileFolderAction.bind(null, workspaceId, selectedFileOrFolder.id)
    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(boundRenameFileFolderAction, zodResolver(RenameFileFolderFormSchema), {
        formProps: {
            defaultValues: {
                name: selectedFileOrFolder.name,
            }
        },
        actionProps: {
            onSuccess: ({ data: newFileFolder }) => {
                if (newFileFolder) replaceFileFolder(newFileFolder)
                closeDialog();
            }
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={(e) => {
                e.preventDefault();
                
                const currentName = form.getValues('name');
                const initialName = selectedFileOrFolder.name;

                if (currentName === initialName) {
                    closeDialog();
                    return;
                }

                handleSubmitWithAction(e);
            }} className={'flex flex-col gap-5'}>
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
                        <Button disabled={action.isPending}
                                variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button loading={action.isPending}
                            type="submit">Rename</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
