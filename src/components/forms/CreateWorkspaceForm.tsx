import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateWorkspaceSchema } from '@/schemas/workspace.schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { onSubmitCreateWorkspaceAction } from '@/actions/workspace/createWorkspace.action';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { usePushRouterWorkspace } from '@/hooks/utils/PushRouterWorkspace';

export function CreateWorkspaceForm() {
    const { closeDialog } = useConfirmationDialogStore();
    const pushRouterWorkspace = usePushRouterWorkspace()

    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(onSubmitCreateWorkspaceAction, zodResolver(CreateWorkspaceSchema), {
        formProps: {
            defaultValues: {
                name: ''
            },
        },
        actionProps: {
            onSuccess: ({ data: newWorkspaceId }) => {
                closeDialog()
                pushRouterWorkspace(newWorkspaceId!)
            }
        }
    })

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
    )
}
