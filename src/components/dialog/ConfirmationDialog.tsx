'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';

export function ConfirmationDialog() {
    const { open, title, description, closeDialog, content } = useConfirmationDialogStore();

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader className={"space-y-3"}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
}
