'use client'

import { SidebarMenuButton } from '@/components/ui/sidebar';
import { UserRoundPlus } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceParams';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { SubmitNewUserForm } from '@/components/forms/SubmitNewUserForm';

export function SidebarInviteUserButton() {
    const { workspace, roleInWorkspace } = useWorkspace();
    const { openDialog } = useConfirmationDialogStore();

    const isRoleRejected = roleInWorkspace.id < 2
    if (isRoleRejected || workspace.isPersonal) return null;

    return (
        <SidebarMenuButton onClick={() => {
            openDialog({
                title: 'Invite peoples',
                description: 'New members will have access to the workspaces and public features of the application.',
                content: <SubmitNewUserForm submitLabel={'Invite'}/>
            })
        }}>
            <UserRoundPlus/>Invite
        </SidebarMenuButton>
    )
}
