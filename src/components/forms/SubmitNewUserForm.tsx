'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { onSubmitAddUserWorkspaceAction } from '@/actions/workspace/addUserWorkspace.action';
import { useWorkspace } from '@/context/WorkspaceParams';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { formatStringFirstUpAllLower } from '@/utils/formatStringFirstUpAllLower';
import { useGetAllRolesInWorkspace } from '@/hooks/api/getAllRolesInWorkspace';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { AddUsersWorkspace } from '@/schemas/workspace.schema';


interface SubmitNewUserFormProps {
    submitLabel: string;
}

export function SubmitNewUserForm({ submitLabel }: SubmitNewUserFormProps) {
    const { workspaceId } = useWorkspace();
    const { closeDialog } = useConfirmationDialogStore();

    const roles = useGetAllRolesInWorkspace()

    const boundInvitePeopleAction = onSubmitAddUserWorkspaceAction.bind(null, workspaceId)

    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(boundInvitePeopleAction, zodResolver(AddUsersWorkspace), {
        formProps: {
            defaultValues: {
                email: [],
                roleId: 1
            }
        },
        actionProps: {
            onSuccess: () => {
                closeDialog()
                toast.success('L\'invitation a été envoyée avec succès !');
            }
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className={'flex flex-col gap-5'}>
                <div className={'flex flex-col gap-5'}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={'flex-1'}>
                                <FormLabel>Emails</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        hideClearAllButton
                                        creatable
                                        placeholder="Emails..."
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roleId"
                        render={({ field }) => (
                            <FormItem className={' items-center gap-5'}>
                                <FormLabel>Permission</FormLabel>
                                <FormControl>
                                    {roles ? (
                                        <Select
                                            value={`${field.value}`}
                                            onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                        >
                                            <SelectTrigger className={'w-32'}>
                                                <SelectValue
                                                    placeholder={formatStringFirstUpAllLower(roles.find(role => role.id === field.value)?.name)}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {roles.map((role) => (
                                                        <SelectItem key={role.id} value={`${role.id}`}>
                                                            {formatStringFirstUpAllLower(role.name)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Skeleton className="h-9 w-32 rounded-md"/>
                                    )}
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className={'flex'}>
                    <DialogClose asChild>
                        <Button disabled={action.isPending} variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button loading={action.isPending} type="submit">{submitLabel}</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
