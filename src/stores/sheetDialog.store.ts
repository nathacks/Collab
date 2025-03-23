import { create } from 'zustand';
import { ReactElement, ReactNode } from 'react';

export interface ConfirmationDialogState {
    open: boolean;
    title: ReactNode | null;
    description: string | ReactNode | null;
    content: ReactElement | null;
}

export interface ConfirmationDialogActions {
    openSheetDialog: (data: Omit<ConfirmationDialogState, 'open'>) => void;
    closeSheetDialog: () => void;
}

export type sheetDialogStore = ConfirmationDialogState & ConfirmationDialogActions;

export const useSheetDialogStore = create<sheetDialogStore>((set) => ({
    open: false,
    title: null,
    description: null,
    content: null,
    openSheetDialog: (data) =>
        set({
            open: true,
            ...data
        }),
    closeSheetDialog: () => set({ open: false }),
}));
