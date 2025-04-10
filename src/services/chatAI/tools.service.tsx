import { TOOLS_CREATE_FILE, TOOLS_CREATE_FOLDER } from '@/schemas/ai/tools.schema';
import { tool } from 'ai';
import { createFileWithPerm, createFolderWithPerm } from '@/modules/file.module';
import { GlobalError } from '@/errors/global.error';

export const TOOLS_AI = (workspaceId: string, parentId: string | null) => ({
    createFile: tool({
        description: 'Create a file with the name',
        parameters: TOOLS_CREATE_FILE,
        execute: async ({ name, extension }) => {
            try {
                const newFile = await createFileWithPerm(workspaceId, name, extension, parentId)
                return {
                    data: newFile
                }
            } catch (error) {
                if (error instanceof GlobalError) {
                    return {
                        error: error.message,
                    }
                }
            }
        },
    }),
    // askForFileExtension: tool({
    //     description: 'Ask the user to choose a file extension. To Create a file with the name',
    //     parameters: z.object({
    //         message: z.string().describe('The message to ask for an extension.'),
    //     }),
    // }),
    createFolder: tool({
        description: 'Create a folder with the name',
        parameters: TOOLS_CREATE_FOLDER,
        execute: async ({ name }) => {
            try {
                const newFile = await createFolderWithPerm(workspaceId, name, parentId)
                return {
                    data: newFile
                }
            } catch (error) {
                if (error instanceof GlobalError) {
                    return {
                        error: error.message,
                    }
                }
            }
        },
    })
})
