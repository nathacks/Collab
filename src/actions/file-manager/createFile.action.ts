'use server';

import { CreateFileFormSchema } from '@/schemas/file-manager.schema';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsCreateFileFolder } from '@/schemas/bind.schema';
import { authActionServer } from '@/lib/api/safe-action';
import { createFileWithPerm } from '@/modules/file.module';

export const onSubmitCreateFileAction = authActionServer
    .schema(CreateFileFormSchema())
    .bindArgsSchemas(bindArgsCreateFileFolder)
    .action(async ({ parsedInput: { name, extension }, bindArgsParsedInputs: [workspaceId, folderId] }) => {
        try {
            return await createFileWithPerm(workspaceId, name, extension, folderId)
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(CreateFileFormSchema(), {
                    name: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
