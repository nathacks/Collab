'use client'

import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/context/WorkspaceParams';
import { onSubmitDeleteWorkspaceAction } from '@/actions/workspace/deleteWorkspace.action';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DeleteWorkspace } from '@/schemas/workspace.schema';
import { toast } from 'sonner';

export function DeleteWorkspaceForm() {
    const { workspaceId, workspace } = useWorkspace();
    const { closeDialog } = useConfirmationDialogStore();

    const boundDeleteWorkspaceAction = onSubmitDeleteWorkspaceAction.bind(null, workspaceId)

    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(boundDeleteWorkspaceAction, zodResolver(DeleteWorkspace(workspace.name)), {
        formProps: {
            defaultValues: {
                nameWorkspace: '',
            }
        },
        actionProps: {
            onSuccess: () => closeDialog(),
            onError: ({ error }: any) => {
                toast.error(error.validationErrors?._errors)
            }
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className={'flex flex-col gap-5'}>
                <div className={'flex flex-row'}>
                    <FormField
                        control={form.control}
                        name="nameWorkspace"
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
                    <Button variant={'destructive'} loading={action.isPending}
                            type="submit">Delete</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
