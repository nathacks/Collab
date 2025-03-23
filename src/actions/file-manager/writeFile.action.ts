'use server';

import { WriteFileFormSchema } from '@/schemas/file-manager.schema';
import { returnValidationErrors } from 'next-safe-action';
import { GlobalError } from '@/errors/global.error';
import { bindArgsWriteFile } from '@/schemas/bind.schema';
import { authActionServer } from '@/lib/api/safe-action';
import { writeFileWithPerm } from '@/modules/file.module';

export const onWriteFileAction = authActionServer
    .schema(WriteFileFormSchema)
    .bindArgsSchemas(bindArgsWriteFile)
    .action(async ({ parsedInput: { content }, bindArgsParsedInputs: [workspaceId, fileId] }) => {
        try {
            return await writeFileWithPerm(workspaceId, fileId, content)
        } catch (error) {
            if (error instanceof GlobalError) {
                return returnValidationErrors(WriteFileFormSchema, {
                    _errors: [error.message],
                });
            }
        }
    });
