'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { RenameWorkspaceFormSchema } from '@/schemas/settings.schema';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';
import { renameWorkspaceWithPerm } from '@/modules/workspace.module';
import { revalidatePath } from 'next/cache';

export const onSubmitRenameWorkspaceAction = authActionServer
    .schema(RenameWorkspaceFormSchema())
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ parsedInput: { name }, bindArgsParsedInputs: [workspaceId] }) => {
        try {
            await renameWorkspaceWithPerm(workspaceId, name)
            revalidatePath('/')
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(RenameWorkspaceFormSchema(), {
                    name: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
