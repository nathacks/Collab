'use client'

import { Button } from '@/components/ui/button'
import { withPermissionRole } from '@/components/permissions/withPermissionRole';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { DeleteWorkspaceForm } from '@/components/forms/workspace/DeleteWorkspaceForm';
import { useWorkspace } from '@/context/WorkspaceParams';

export function DeleteWorkspace() {
    const PermissionRoleButton = withPermissionRole(Button, 3)
    const { openDialog } = useConfirmationDialogStore()
    const { workspace } = useWorkspace();

    return (
        <PermissionRoleButton className={'self-start'} variant={'textDestructive'}
                              disabled={workspace.isPersonal} onClick={() => {
            openDialog({
                title: 'Are you absolutely sure?',
                description:
                    <span>This action is irreversible. Type the workspace name to confirm its deletion: <b>{workspace.name}</b></span>,
                content: <DeleteWorkspaceForm/>
            })
        }}>Delete workspace</PermissionRoleButton>
    )
}
