'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { CreateWorkspaceSchema } from '@/schemas/workspace.schema';
import { createWorkspaceWithPerm } from '@/modules/workspace.module';

export const onSubmitCreateWorkspaceAction = authActionServer
    .schema(CreateWorkspaceSchema)
    .action(async ({ parsedInput: { name } }) => {
        try {
            return await createWorkspaceWithPerm(name)
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(CreateWorkspaceSchema, {
                    name: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
