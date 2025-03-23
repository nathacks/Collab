'use server';

import { authActionServer } from '@/lib/api/safe-action';
import { RenameFileFolderFormSchema } from '@/schemas/file-manager.schema';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsFileFolderRename } from '@/schemas/bind.schema';
import { renameFileOrDirectoryWithPerm } from '@/modules/file.module';

export const onSubmitRenameFileFolderAction = authActionServer
    .schema(RenameFileFolderFormSchema)
    .bindArgsSchemas(bindArgsFileFolderRename)
    .action(async ({ parsedInput: { name }, bindArgsParsedInputs: [workspaceId, fileOrFolderId] }) => {
        try {
            return await renameFileOrDirectoryWithPerm(workspaceId, fileOrFolderId, name);
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(RenameFileFolderFormSchema, {
                    name: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
