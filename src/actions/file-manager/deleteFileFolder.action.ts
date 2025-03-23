'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { DeleteFileFolderSchema } from '@/schemas/file-manager.schema';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { deleteFileOrDirectoryWithPerm } from '@/modules/file.module';
import { bindArgsWorkspaceId } from '@/schemas/bind.schema';

export const onSubmitDeleteFileFolderAction = authActionServer
    .schema(DeleteFileFolderSchema)
    .bindArgsSchemas(bindArgsWorkspaceId)
    .action(async ({ parsedInput, bindArgsParsedInputs: [workspaceId] }) => {
        try {
            return await deleteFileOrDirectoryWithPerm(workspaceId, parsedInput)
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(DeleteFileFolderSchema, {
                    _errors: [error.message],
                });
            }
        }
    });
