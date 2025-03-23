import { create } from 'zustand';
import { ReactElement } from 'react';

export interface ConfirmationDialogState {
    open: boolean;
    title: string | null;
    description: string | ReactElement | null ;
    content: ReactElement | null;
}

export interface ConfirmationDialogActions {
    openDialog: (data: Omit<ConfirmationDialogState, 'open'>) => void;
    closeDialog: () => void;
}

export type ConfirmationDialogStore = ConfirmationDialogState & ConfirmationDialogActions;

export const useConfirmationDialogStore = create<ConfirmationDialogStore>((set) => ({
    open: false,
    title: null,
    description: null,
    content: null,
    openDialog: (data) =>
        set({
            open: true,
            ...data
        }),
    closeDialog: () => set({ open: false }),
}));
