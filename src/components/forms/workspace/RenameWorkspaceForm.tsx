'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWorkspace } from '@/context/WorkspaceParams';
import { RenameWorkspaceFormSchema } from '@/schemas/settings.schema';
import { onSubmitRenameWorkspaceAction } from '@/actions/workspace/renameWorkspace.action';
import { toast } from 'sonner';


export function RenameWorkspaceForm() {
    const { workspaceId, workspace, workspaces } = useWorkspace();

    const boundRenameWorksapceAction = onSubmitRenameWorkspaceAction.bind(null, workspaceId)

    const workspaceNames = workspaces.map((workspace) => workspace.name)

    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(boundRenameWorksapceAction, zodResolver(RenameWorkspaceFormSchema(workspaceNames)), {
        formProps: {
            defaultValues: {
                name: workspace.name,
            }
        },
        actionProps: {
            onSuccess: () => toast.success('Workspace renamed successfully')
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className={'flex flex-col gap-5 flex-1'}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className={'self-start'} loading={action.isPending} type="submit">Submit</Button>
            </form>
        </Form>
    );
}
