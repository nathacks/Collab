import { File as FileInfo, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma/prisma';
import {
    DELETE_FILE_OWNER_AND_OMIT,
    DeleteFileOwnerAndOmit,
    FILE_WITH_OWNER_AND_OMIT,
    FILE_WITH_WORKSPACE_PARENT_AND_OMIT,
    FileInfoWithWorkspaceParentOmit,
    FileWithOwnerAndOmit,
    FolderWithOmit,
    GetFolderInfo
} from '@/models/file-manager.model';
import { getUserSession } from '@/lib/auth-session';
import { GlobalError } from '@/errors/global.error';


export async function addFileOrFolder(fileInfo: FolderWithOmit): Promise<FileWithOwnerAndOmit> {
    const userSession = await getUserSession();

    try {
        return await prisma.file.create({
            data: {
                ...fileInfo,
                ownerId: userSession?.user.id!,
            },
            ...FILE_WITH_OWNER_AND_OMIT
        });
    } catch (error) {
        throw new GlobalError({ message: `Error create file/folder` });
    }
}

export async function existsFileOrFolderByName(workspaceId: string, name: string, extension: string | null, parentId: string | null) {
    const fileOrFolder = await prisma.file.findFirst({
        where: {
            parentId,
            workspaceId,
            name,
            extension,
        },
        select: {
            id: true,
        }
    });

    if (fileOrFolder) throw new GlobalError({ message: `${extension ? 'File' : 'Folder'} already exists` });
}


export function getFileOrFolderById(workspaceId: string, fileOrFolderId: string): Promise<FileInfo | null> {
    return prisma.file.findUnique({
        where: { id: fileOrFolderId, workspaceId }
    });
}

export async function getFileFolderByInput(nameFileOrFolder: string): Promise<FileInfoWithWorkspaceParentOmit[]> {
    const userSession = await getUserSession();

    try {
        return await prisma.file.findMany({
            where: {
                name: {
                    contains: nameFileOrFolder,
                    mode: 'insensitive'
                },
                workspace: {
                    members: {
                        some: {
                            userId: userSession?.user.id
                        }
                    }
                }
            },
            ...FILE_WITH_WORKSPACE_PARENT_AND_OMIT
        });
    } catch (error) {
        throw new GlobalError({ message: `Error get file folder` });
    }
}


export async function getFolder(workspaceId: string, folderId: string | null): Promise<GetFolderInfo> {
    const children = await prisma.file.findMany({
        where: {
            workspaceId,
            parentId: folderId
        },
        ...FILE_WITH_OWNER_AND_OMIT
    });

    const parent = folderId
        ? await prisma.file.findUnique({
            where: { id: folderId },
            ...FILE_WITH_OWNER_AND_OMIT
        })
        : null;

    return {
        parent,
        children
    };
}


export async function renameFileOrDirectory(newNameFileFolder: string, fileOrFolderId: string): Promise<FileWithOwnerAndOmit> {
    try {
        return await prisma.file.update({
            where: { id: fileOrFolderId },
            data: {
                name: newNameFileFolder,
            },
            ...FILE_WITH_OWNER_AND_OMIT
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') throw new GlobalError({ message: `This name is already taken` });
        }
        throw new GlobalError({ message: `Error rename file or folder` });
    }
}

export async function deleteFilesOrFolders(workspaceId: string, fileOrFolderIds: string[]): Promise<[DeleteFileOwnerAndOmit[], {
    count: number
}]> {
    try {
        return prisma.$transaction(
            [
                prisma.file.findMany({
                    where: { id: { in: fileOrFolderIds }, workspaceId },
                    ...DELETE_FILE_OWNER_AND_OMIT
                }),
                prisma.file.deleteMany({
                    where: { id: { in: fileOrFolderIds }, workspaceId },
                }),
            ],
            { isolationLevel: `RepeatableRead` },
        )
    } catch (e) {
        throw new GlobalError({ message: `Error delete file or folder` });
    }
}

export async function updateFileSize(fileId: string, newSize: number): Promise<FileInfo> {
    try {
        return await prisma.file.update({
            where: { id: fileId },
            data: { size: newSize },
        });
    } catch (error) {
        throw new GlobalError({ message: `Error updating file size` });
    }
}

export async function getFileCountInWorkspace(workspaceId: string): Promise<number> {
    try {
        return await prisma.file.count({
            where: { workspaceId, type: 'FILE' }
        });
    } catch (error) {
        throw new GlobalError({ message: `Error counting files in workspace` });
    }
}

export async function getFolderCountInWorkspace(workspaceId: string): Promise<number> {
    try {
        return await prisma.file.count({
            where: { workspaceId, type: 'FOLDER' },
        });
    } catch (error) {
        throw new GlobalError({ message: `Error counting folder in workspace` });
    }
}
