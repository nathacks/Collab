import { z } from 'zod';

export const TOOLS_CREATE_FILE = z.object({
    // parentFolderId: z.string().describe('The parent folder name').nullable(),

    name: z.string()
        .describe('The name of the file to create')
        .min(1, 'Name required')
        .refine((value) => !value.includes('.'), { message: 'Name cannot contain a period (.)' }),
    extension: z
        .string()
        .min(1, 'Extension required')
        .describe('The extension of the file, start with a dot (.)')
        .transform((value) => value.startsWith('.') ? value : `.${value}`)
})

export const TOOLS_CREATE_FOLDER = z.object({
    name: z
        .string()
        .min(1, 'FolderName required')
        .describe('The name of the folder to create')
})
