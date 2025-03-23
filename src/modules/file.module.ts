import { createId as createCuid2 } from '@paralleldrive/cuid2';
import {
    addFileOrFolder,
    deleteFilesOrFolders,
    existsFileOrFolderByName,
    getFileFolderByInput,
    getFileOrFolderById,
    getFolder,
    renameFileOrDirectory,
    updateFileSize
} from '@/services/file-manager/file.service';
import {
    createFileFS,
    createFolderFS,
    deleteFileOrDirectory,
    pathFileFolder,
    writeFileFS
} from '@/services/file-manager/fileManager.service';
import { getUserPermissions } from '@/services/user/permission.service';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import { GlobalError } from '@/errors/global.error';
import { Content } from '@tiptap/react';


export async function getFolderWithPerm(workspaceId: string, parentId: string | null) {
    return getUserPermissions(workspaceId, { permissionsName: ['READ'] })
        .then(() => getFolder(workspaceId, parentId))
}


export async function getFileFolderByInputWithPerm(nameFileOrFolder: string) {
    return getFileFolderByInput(nameFileOrFolder)
}

export async function createFileWithPerm(workspaceId: string, fileName: string, extension: string, parentId: string | null): Promise<FileWithOwnerAndOmit> {
    return getUserPermissions(workspaceId, { permissionsName: ['WRITE'] })
        .then(async () => {
            await existsFileOrFolderByName(workspaceId, fileName, extension, parentId)

            const fileUuid = createCuid2();
            const basePath = await pathFileFolder(workspaceId, parentId, fileUuid + extension)

            const newFile = await addFileOrFolder({
                id: fileUuid,
                name: fileName,
                type: 'FILE',
                extension,
                parentId,
                path: basePath,
                size: 0,
                workspaceId
            })

            await createFileFS(basePath);
            return newFile;
        })
}

export async function writeFileWithPerm(workspaceId: string, fileId: string, content: Content) {
    return getUserPermissions(workspaceId, { permissionsName: ['WRITE'] })
        .then(async () => {
            const file = await getFileOrFolderById(workspaceId, fileId);
            if (!file) throw new GlobalError({ message: `File not exists` });

            const statFile = await writeFileFS(file.path, content)
            await updateFileSize(fileId, statFile.size)
        })
}


export async function createFolderWithPerm(workspaceId: string, folderName: string, parentId: string | null): Promise<FileWithOwnerAndOmit> {
    return getUserPermissions(workspaceId, { permissionsName: ['WRITE'] })
        .then(async () => {
            await existsFileOrFolderByName(workspaceId, folderName, null, parentId)

            const folderUuid = createCuid2();
            const basePath = await pathFileFolder(workspaceId, parentId, folderUuid)

            const newFolder = await addFileOrFolder({
                id: folderUuid,
                name: folderName,
                type: 'FOLDER',
                extension: null,
                parentId,
                size: null,
                path: basePath,
                workspaceId
            })

            await createFolderFS(basePath);
            return newFolder
        })
}

export async function deleteFileOrDirectoryWithPerm(workspaceId: string, fileOrFolderIds: string[]): Promise<string[]> {
    return getUserPermissions(workspaceId, { permissionsName: ['WRITE'] })
        .then(async () => {
            const [fileOrFolderInfos] = await deleteFilesOrFolders(workspaceId, fileOrFolderIds);
            await deleteFileOrDirectory(fileOrFolderInfos)

            return fileOrFolderIds;
        })
}

export async function renameFileOrDirectoryWithPerm(workspaceId: string, fileOrFolderId: string, newNameFileFolder: string): Promise<FileWithOwnerAndOmit> {
    return getUserPermissions(workspaceId, { permissionsName: ['WRITE'] })
        .then(async () => {
            return await renameFileOrDirectory(newNameFileFolder, fileOrFolderId);
        })
}
