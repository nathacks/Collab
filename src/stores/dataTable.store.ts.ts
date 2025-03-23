import { create, StoreApi, UseBoundStore } from 'zustand';
import { useFileManagerStore } from '@/stores/files.store';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';

export interface DataTableSlice {
    rowSelection: Record<string, boolean>
    rowSelectionData: (key?: keyof FileWithOwnerAndOmit) => any[]
    setRowSelection: (rows: Record<string, boolean>) => void
    resetRowSelection: () => void
}

export type DataTableStore = UseBoundStore<StoreApi<DataTableSlice>>

export const useDataTableStore: DataTableStore = create<DataTableSlice>((set, get) => ({
    rowSelection: {},
    rowSelectionData: (key) => {
        const rowSelection = get().rowSelection;
        const filesFolders = useFileManagerStore.getState().filesFolders;

        const selectedIds = Object.keys(rowSelection);

        return selectedIds
            .map((id) => filesFolders.children.find((file) => file.id === id))
            .filter((file): file is FileWithOwnerAndOmit => file !== undefined)
            .map((file) => key ? file[key] : file);
    },
    setRowSelection: (rows) => set(() => ({ rowSelection: rows })),
    resetRowSelection: () => set(() => ({ rowSelection: {} }))
}));
