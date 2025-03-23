'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { deleteWorkspaceWithPerm } from '@/modules/workspace.module';
import { DeleteWorkspaceSchema } from '@/schemas/settings.schema';
import { redirect } from 'next/navigation';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export const onSubmitDeleteWorkspaceAction = authActionServer
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ bindArgsParsedInputs: [workspaceId] }) => {
        try {
            const nextWorkspace = await deleteWorkspaceWithPerm(workspaceId)
            redirect(`/${nextWorkspace!.id}/dashboard`)
        } catch (error) {
            if (isRedirectError(error)) throw error;
            if (error instanceof GlobalError) {
                return returnValidationErrors(DeleteWorkspaceSchema, {
                    _errors: [error.message],
                });
            }
        }
    });
