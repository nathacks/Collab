'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';
import { revalidatePath } from 'next/cache';
import { RemoveUsersWorkspace } from '@/schemas/workspace.schema';
import { removeUserInWorkspaceWithPerm } from '@/modules/workspace.module';

export const onSubmitRemoveUserWorkspaceAction = authActionServer
    .schema(RemoveUsersWorkspace)
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ parsedInput: { userId, email }, bindArgsParsedInputs: [workspaceId] }) => {
        try {
            await removeUserInWorkspaceWithPerm(workspaceId, { userId, email })
            revalidatePath('/')
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(RemoveUsersWorkspace, {
                    _errors: [error.message],
                });
            }
        }
    });
