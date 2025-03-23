import { z } from 'zod';
import { workspaceId } from '@/schemas/workspace.schema';

export const RenameWorkspaceFormSchema = (workspaceNames?: string[]) =>
    z.object({
        name: z.string()
            .min(1, 'Workspace name required')
            .refine((value) => !workspaceNames?.some((workspaceName) => workspaceName === value), {
                message: 'Name already exists.',
            })
    })


export const DeleteWorkspaceSchema = z.object({
    workspaceId
})
