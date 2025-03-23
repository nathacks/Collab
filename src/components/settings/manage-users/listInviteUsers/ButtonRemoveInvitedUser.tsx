import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useAlertConfirmationDialogStore } from '@/stores/alertConfirmationDialog.store';
import { useAction } from 'next-safe-action/hooks';
import { onSubmitRemoveUserWorkspaceAction } from '@/actions/workspace/removeUserWorkspaceAction';
import { useWorkspace } from '@/context/WorkspaceParams';
import { toast } from 'sonner';

interface ButtonRevokeUserProps {
    email: string
}

export function ButtonRemoveInvitedUser({ email }: ButtonRevokeUserProps) {
    const { workspaceId } = useWorkspace();
    const boundDeleteFileFolder = onSubmitRemoveUserWorkspaceAction.bind(null, workspaceId)

    const { executeAsync } = useAction(boundDeleteFileFolder);

    const {
        openAlertDialog,
    } = useAlertConfirmationDialogStore();

    return (
        <Button size={'icon'} variant="destructive" onClick={() => {
            openAlertDialog({
                title: 'Remove user invited from workspace?',
                description: 'This action cannot be undone.',
                cancelLabel: 'Cancel',
                actionLabel: 'Remove',
                onAction: async () => {
                    const result = await executeAsync({ email })

                    if (result?.validationErrors?._errors) {
                        toast.error(result.validationErrors?._errors);
                        return;
                    }

                    toast.success('User invited has been successfully remove.')
                }
            })
        }}>
            <Trash2 />
        </Button>
    )
}
