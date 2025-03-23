import { getWorkspaceUsersWithRoles } from '@/services/user/userOnWorkspace.service';
import { getWorkspaceInvitedUsersWithRole } from '@/services/user/invitationUser.service';
import { Separator } from '@/components/ui/separator';
import { DataTableListUsers } from '@/components/settings/manage-users/listUsers/DataTableListUsers';
import { DataTableListInviteUsers } from '@/components/settings/manage-users/listInviteUsers/DataTableListInviteUsers';
import { columnsListInviteUsers } from '@/components/settings/manage-users/listInviteUsers/ColumnsListInviteUsers';
import { columnsListUsers } from '@/components/settings/manage-users/listUsers/ColumnsListUsers';
import { AddUserButton } from '@/components/settings/manage-users/listInviteUsers/AddUserButton';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isWorkspacePersonal } from '@/services/workspace/workspace.service';
import { permanentRedirect } from 'next/navigation';

export default async function ManageUsersPage({ params }: { params: Promise<{ workspaceId: string }> }) {
    const { workspaceId } = await params

    const usersRole = await getWorkspaceUsersWithRoles(workspaceId)
    const usersInvitedRole = await getWorkspaceInvitedUsersWithRole(workspaceId)
    const isPersonal = await isWorkspacePersonal(workspaceId)

    if (isPersonal) permanentRedirect(`/${workspaceId}/dashboard`)

    return (
        <div className={'flex flex-1 flex-col gap-3 px-7 pt-7'}>
            <div className={'flex items-end'}>
                <div className={'flex flex-1 flex-col gap-2'}>
                    <h1 className={'text-2xl font-semibold'}>Manage users</h1>
                    <span className={'text-secondary-foreground text-sm'}>Manage and invite users to your workspace, assign roles.</span>
                </div>
                <AddUserButton/>
            </div>
            <Separator/>
            <div className={'flex flex-1 flex-col gap-12 size-full pb-3'}>
                <DataTableListUsers columns={columnsListUsers} data={usersRole}/>
                <div className={'flex flex-[2] flex-col gap-2'}>
                    <div className={'flex flex-row items-baseline gap-1'}>
                        <h1 className={'text-2xl font-semibold'}>Invited Users</h1>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className={'cursor-pointer'} size={18}/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span className="flex max-w-[250px]">
                                    List of users who have been added to the Workspace but do not yet have an account.
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <DataTableListInviteUsers columns={columnsListInviteUsers} data={usersInvitedRole}/>
                </div>
            </div>
        </div>
    )
}
