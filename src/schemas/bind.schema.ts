import { z } from 'zod';
import { workspaceId } from '@/schemas/workspace.schema';

export const bindArgsCreateFileFolder: [workspaceId: z.ZodString, folderId: z.ZodNullable<z.ZodString>] = [
    workspaceId,
    z.string().cuid2().nullable(),
];

export const bindArgsWriteFile: [workspaceId: z.ZodString, fileId: z.ZodString] = [
    workspaceId,
    z.string().cuid2()
];

export const bindArgsFileFolderRename: [workspaceId: z.ZodString, fileOrFolderId: z.ZodString] = [
    workspaceId,
    z.string().cuid2()
]

export const bindArgsWorkspaceId: [workspaceId: z.ZodString] = [
    workspaceId
]
