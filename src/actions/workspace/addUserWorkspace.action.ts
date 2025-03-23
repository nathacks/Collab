'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';
import { addUsersInWorkspaceWithPerm } from '@/modules/workspace.module';
import { revalidatePath } from 'next/cache';
import { AddUsersWorkspace } from '@/schemas/workspace.schema';

export const onSubmitAddUserWorkspaceAction = authActionServer
    .schema(AddUsersWorkspace)
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ parsedInput: { email, roleId }, bindArgsParsedInputs: [workspaceId] }) => {
        try {
            await addUsersInWorkspaceWithPerm(workspaceId, email, roleId)
            revalidatePath('/')
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(AddUsersWorkspace, {
                    email: {
                        _errors: [error.message],
                    },
                });
            }
        }
    });
