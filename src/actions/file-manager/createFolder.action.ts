'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { CreateFolderFormSchema } from '@/schemas/file-manager.schema';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsCreateFileFolder } from '@/schemas/bind.schema';
import { createFolderWithPerm } from '@/modules/file.module';

export const onSubmitCreateFolderAction = authActionServer
    .schema(CreateFolderFormSchema())
    .bindArgsSchemas(bindArgsCreateFileFolder)
    .action(async ({ parsedInput: { name }, bindArgsParsedInputs: [workspaceId, folderId] }) => {
        try {
            return await createFolderWithPerm(workspaceId, name, folderId)
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(CreateFolderFormSchema(), {
                    name: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
