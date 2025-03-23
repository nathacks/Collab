import { create, StoreApi, UseBoundStore } from 'zustand';
import { sortByKey } from '@/utils/sortByKey';
import applyMiddleware, { Middleware } from '@/stores/utils/applyMiddleware.zustand';
import { useDataTableStore } from '@/stores/dataTable.store.ts';
import { FileWithOwnerAndOmit, GetFolderInfo } from '@/models/file-manager.model';


interface FilesSlice {
    filesFolders: GetFolderInfo
    setFilesFolders: (treeFolder: GetFolderInfo) => void;
    addFileFolder: (fileFolder: FileWithOwnerAndOmit) => void;
    deleteFilesFolders: (fileFolderIds: string | string[]) => void;
    replaceFileFolder: (newFileFolder: FileWithOwnerAndOmit) => void;
}

export type FilesStore = UseBoundStore<StoreApi<FilesSlice>>

const afterMiddleware: Middleware<FilesSlice> = () => {
    useDataTableStore.getState().resetRowSelection();
};

export const useFileManagerStore: FilesStore = create<FilesSlice>(
    applyMiddleware({
        store: (set, get) => ({
            filesFolders: {
                parent: null,
                children: [],
            },

            setFilesFolders(treeFolder) {
                set({
                    filesFolders: treeFolder
                });
            },

            addFileFolder: (file) => {
                const prevState = get().filesFolders;
                set({
                    filesFolders: {
                        ...prevState,
                        children: sortByKey([...prevState.children, file], 'name'),
                    },
                });
            },

            deleteFilesFolders: (fileFolderIds) => {
                const prevState = get().filesFolders;
                set({
                    filesFolders: {
                        ...prevState,
                        children: prevState.children.filter(file => !fileFolderIds.includes(file.id))
                    },
                });
            },

            replaceFileFolder: (newFileFolder) => {
                const prevState = get().filesFolders;
                set({
                    filesFolders: {
                        ...prevState,
                        children: sortByKey(
                            prevState.children.map(file =>
                                file.id === newFileFolder.id ? newFileFolder : file
                            ),
                            'name'
                        ),
                    },
                });
            },
        }),
        afterMiddlware: afterMiddleware,
        excludeActions: ['replaceFileFolder']
    })
);
