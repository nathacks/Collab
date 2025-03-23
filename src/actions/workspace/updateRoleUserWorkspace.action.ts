'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';
import { updateUserRoleWithPerm } from '@/modules/workspace.module';
import { revalidatePath } from 'next/cache';
import { AddUsersWorkspace, UpdateRoleUserWorkspace } from '@/schemas/workspace.schema';

export const onSubmitUpdateRoleUserWorkspaceAction = authActionServer
    .schema(UpdateRoleUserWorkspace)
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ parsedInput: { userId, roleId, email }, bindArgsParsedInputs: [workspaceId] }) => {
        try {
            await updateUserRoleWithPerm(workspaceId, roleId, { userId, email })
            revalidatePath('/')
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(AddUsersWorkspace, {
                    _errors: [error.message],
                });
            }
        }
    });
