import { Button } from '@/components/ui/button';
import { UserX } from 'lucide-react';
import { useAlertConfirmationDialogStore } from '@/stores/alertConfirmationDialog.store';
import { useAction } from 'next-safe-action/hooks';
import { onSubmitRemoveUserWorkspaceAction } from '@/actions/workspace/removeUserWorkspaceAction';
import { useWorkspace } from '@/context/WorkspaceParams';
import { toast } from 'sonner';

interface ButtonRevokeUserProps {
    userId: string
    roleId: number
}

export function ButtonRevokeUser({ userId, roleId }: ButtonRevokeUserProps) {
    const { workspaceId, roleInWorkspace } = useWorkspace();
    const boundDeleteFileFolder = onSubmitRemoveUserWorkspaceAction.bind(null, workspaceId)

    const { executeAsync } = useAction(boundDeleteFileFolder);

    const {
        openAlertDialog,
    } = useAlertConfirmationDialogStore();

    const isRoleRejected = roleInWorkspace.id <= roleId

    if (isRoleRejected) return null;

    return (
        <Button size={'icon'} variant="destructive" onClick={() => {
            openAlertDialog({
                title: 'Revoke user from workspace?',
                description: 'This action cannot be undone. The user will lose access to this workspace.',
                cancelLabel: 'Cancel',
                actionLabel: 'Revoke',
                onAction: async () => {
                    const result = await executeAsync({ userId })

                    if (result?.validationErrors?._errors) {
                        toast.error(result.validationErrors?._errors);
                        return;
                    }

                    toast.success('User has been successfully revoked.')
                }
            })
        }}>
            <UserX/>
        </Button>
    )
}
