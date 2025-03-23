'use client'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlertConfirmationDialogStore } from '@/stores/alertConfirmationDialog.store';
import { Button } from '../ui/button';

export function AlertConfirmationDialog() {
    const {
        open,
        title,
        description,
        cancelLabel,
        actionLabel,
        isPending,
        onAction,
        closeAlertDialog
    } = useAlertConfirmationDialogStore();

    return (
        <AlertDialog open={open} onOpenChange={closeAlertDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <Button variant={'destructive'} loading={isPending} disabled={isPending}
                            onClick={() => {
                                useAlertConfirmationDialogStore.setState({ isPending: true });
                                onAction().then(closeAlertDialog)
                                    .finally(() => useAlertConfirmationDialogStore.setState({ isPending: false }))
                            }}>{actionLabel}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
