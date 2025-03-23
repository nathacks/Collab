import { File as FileInfo, Prisma } from '@prisma/client';


const validatorWithWorkspaceParentAndOmit = Prisma.validator<Prisma.FileDefaultArgs>()({
    include: {
        workspace: { select: { name: true } },
        parent: { select: { name: true } }
    },
    omit: {
        ownerId: true,
        path: true
    }
});

export const FILE_WITH_WORKSPACE_PARENT_AND_OMIT = validatorWithWorkspaceParentAndOmit;
export type FileInfoWithWorkspaceParentOmit = Prisma.FileGetPayload<typeof validatorWithWorkspaceParentAndOmit>;

const validatorWithoutOwnerPath = Prisma.validator<Prisma.FileDefaultArgs>()({
    include: {
        owner: {
            select: {
                name: true
            }
        }
    },
    omit: {
        ownerId: true,
        path: true
    }
});

export const FILE_WITH_OWNER_AND_OMIT = validatorWithoutOwnerPath;
export type FileWithOwnerAndOmit = Prisma.FileGetPayload<typeof validatorWithoutOwnerPath>;


const validatorWithoutOwner = Prisma.validator<Prisma.FileDefaultArgs>()({
    include: {
        owner: {
            select: {
                name: true
            }
        }
    },
    omit: {
        ownerId: true,
    }
});

export const DELETE_FILE_OWNER_AND_OMIT = validatorWithoutOwner;
export type DeleteFileOwnerAndOmit = Prisma.FileGetPayload<typeof validatorWithoutOwner>;

export interface GetFolderInfo {
    parent: FileWithOwnerAndOmit | null;
    children: FileWithOwnerAndOmit[];
}


export type FolderWithOmit = Omit<FileInfo, 'createdAt' | 'updatedAt' | 'ownerId'>
