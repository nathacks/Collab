'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { InfoFileFolderFormSchema } from '@/schemas/file-manager.schema';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';

export const onSubmitInfoFileFolderAction = authActionServer
    .schema(InfoFileFolderFormSchema())
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ parsedInput: { name }, bindArgsParsedInputs: [workspaceId] }) => {
        try {
            return {}
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(InfoFileFolderFormSchema(), {
                    name: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
