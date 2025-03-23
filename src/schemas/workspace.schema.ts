import { z } from 'zod';


export const workspaceId = z.string().cuid2()

export const WorkspaceApiParamsSchema = z.object({
    workspaceId
});

export const CreateWorkspaceSchema = z.object({
    name: z.string().min(1, 'Workspace name required')
})

const AddUsersWorkspaceOptionSchema = z.object({
    value: z
        .string()
        .email({ message: 'Invalid email address' })
});

export const AddUsersWorkspace = z.object({
    email: z.array(AddUsersWorkspaceOptionSchema).min(1, { message: 'At least one email is required' }),
    roleId: z.number()
});

export const RemoveUsersWorkspace = z.object({
    userId: z.string().optional(),
    email: z.string().optional()
});

export const UpdateRoleUserWorkspace = z.object({
    roleId: z.number(),
    userId: z.string().optional(),
    email: z.string().optional()
})

export const DeleteWorkspace = (nameWorkspace: string) => z.object({
    nameWorkspace: z.string()
        .nonempty({ message: 'Workspace name required' })
        .refine(value => value === nameWorkspace, {
            message: 'Workspace name not correct.',
        }),
});

