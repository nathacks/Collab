import fs from 'node:fs/promises';
import path from 'node:path';
import { GlobalError } from '@/errors/global.error';
import { getFileOrFolderById, } from '@/services/file-manager/file.service';
import { Content } from '@tiptap/react';
import { Stats } from 'node:fs';
import { DeleteFileOwnerAndOmit } from '@/models/file-manager.model';


const BASE_DIRECTORY = path.join(process.cwd(), `${process.env.FOLDER_DATA}`);

export function resolvePath(relativePath: string = '/'): string {
    return path.join(BASE_DIRECTORY, relativePath);
}

export async function pathFileFolder(workspaceId: string, parentFolderId: string | null, nameFileFolder: string): Promise<string> {
    const parentFolder = parentFolderId && await getFileOrFolderById(workspaceId, parentFolderId)
    return path.join(parentFolder ? parentFolder.path : workspaceId, nameFileFolder);
}

export async function createWorkspaceFolder(workspaceId: string) {
    try {
        const resolveFolderPath = resolvePath(workspaceId);
        await fs.mkdir(resolveFolderPath, { recursive: true });
    } catch (error) {
        throw new GlobalError({ message: 'ErrorFS create Workspace' });
    }
}

export async function writeFileFS(filePath: string, content: Content): Promise<Stats> {
    const resolveFilePath = resolvePath(filePath);

    const contentString = JSON.stringify(content, null);

    try {
        await fs.writeFile(resolveFilePath, contentString, 'utf-8');
        return await fs.stat(resolveFilePath);
    } catch (error) {
        throw new GlobalError({ message: 'ErrorFS writing to file' });
    }
}

export async function readFileFS(filePath: string): Promise<Content> {
    const resolveFilePath = resolvePath(filePath);

    try {
        await fs.access(resolveFilePath);
        return await fs.readFile(resolveFilePath, 'utf-8');
    } catch (error) {
        throw new GlobalError({ message: 'ErrorFS reading file' });
    }
}

export async function deleteWorkspaceFolder(workspaceId: string) {
    const resolveFolderPath = resolvePath(workspaceId);

    try {
        await fs.rm(resolveFolderPath, { recursive: true, force: true });
    } catch (error) {
        throw new GlobalError({ message: 'ErrorFS delete workspace' });
    }
}


export async function createFileFS(basePath: string) {
    const resolveFilePath = resolvePath(basePath);

    try {
        await fs.writeFile(resolveFilePath, '');
    } catch (error) {
        throw new GlobalError({ message: 'Error create file' });
    }
}

export async function createFolderFS(basePath: string) {
    const resolveFolderPath = resolvePath(basePath);

    try {
        await fs.mkdir(resolveFolderPath, { recursive: true });
    } catch (error) {
        throw new GlobalError({ message: 'Error create folder' });
    }
}

export async function deleteFileOrDirectory(fileOrFolderInfos: DeleteFileOwnerAndOmit[]): Promise<DeleteFileOwnerAndOmit[]> {
    try {
        for (const fileOrFolderInfo of fileOrFolderInfos) {
            const basePath = resolvePath(fileOrFolderInfo.path);

            if (fileOrFolderInfo.type === 'FOLDER') {
                await fs.rm(basePath, { recursive: true, force: true });
            } else {
                await fs.unlink(basePath);
            }
        }
        return fileOrFolderInfos;
    } catch (error) {
        throw new GlobalError({ message: `Error delete file or folder FS` });
    }
}


export async function moveFileOrDirectory(oldPath: string, newPath: string): Promise<void> {
    //
    // try {
    //     await fs.rename(sourceExists, resolvePath(newPath));
    // } catch (error) {
    //     throw new GlobalError({ message: `Erreur lors du déplacement` });
    // }
}
