import { create } from 'zustand';

export interface ConfirmationDialogState {
    open: boolean;
    title: string | null;
    description: string | null;
    cancelLabel: string | null;
    actionLabel: string | null;
    isPending: boolean;
    onAction: () => Promise<void>;
    onCancel?: () => void;
}

export interface ConfirmationDialogActions {
    openAlertDialog: (data: Omit<ConfirmationDialogState, 'open' | 'isPending'>) => void;
    closeAlertDialog: () => void;
}

export type AlertConfirmationDialogStore = ConfirmationDialogState & ConfirmationDialogActions;

export const useAlertConfirmationDialogStore = create<AlertConfirmationDialogStore>((set) => ({
    open: false,
    title: null,
    description: null,
    cancelLabel: null,
    actionLabel: null,
    isPending: false,
    onAction: async () => {
    },
    onCancel: undefined,
    openAlertDialog: ({ title, description, cancelLabel, actionLabel, onAction, onCancel }) =>
        set({
            open: true,
            title,
            description,
            cancelLabel,
            actionLabel,
            onAction,
            onCancel,
        }),
    closeAlertDialog: () => set({ open: false }),
}));
