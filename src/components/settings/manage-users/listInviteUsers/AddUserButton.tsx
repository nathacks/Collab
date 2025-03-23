'use client'

import { Button } from '@/components/ui/button';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { SubmitNewUserForm } from '@/components/forms/SubmitNewUserForm';
import { Plus } from 'lucide-react';

export function AddUserButton() {
    const { openDialog } = useConfirmationDialogStore();

    return (
        <Button icon={<Plus />} onClick={() => {
            openDialog({
                title: 'Add users',
                description: 'New members will have access to the workspaces and public features of the application.',
                content: <SubmitNewUserForm submitLabel={"Add"}/>
            })
        }}>Add users</Button>
    )
}
