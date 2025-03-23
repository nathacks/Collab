import { z } from 'zod';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import { Content } from '@tiptap/react';


export const FileInfoSchema = z.object({
    name: z.string(),
    size: z.number(),
    path: z.string(),
    extension: z.string().optional(),
    dateCreation: z.number(),
    lastModify: z.number(),
    lastAccess: z.number(),
    isFile: z.boolean(),
    isDirectory: z.boolean(),
});

export const CreateFileFormSchema = (files?: FileWithOwnerAndOmit[]) =>
    z.object({
        name: z.string()
            .min(1, 'Name required')
            .refine((value) => !value.includes('.'), { message: 'Name cannot contain a period (.)' })
            .refine((value) => !files?.some(file => file.name === value), {
                message: 'Ce fichier existe déjà.',
            }),
        extension: z
            .string()
            .min(1)
            .refine((value) => value.startsWith('.'), { message: 'Extension must start with a dot (.)' })
    })

export const CreateFolderFormSchema = (folders?: FileWithOwnerAndOmit[]) =>
    z.object({
        name: z
            .string()
            .min(1, 'Name required')
            .refine((value) => !folders?.some(folder => folder.name === value), {
                message: 'Ce dossier existe déjà.',
            })
    })

export const WriteFileFormSchema = z.object({
    content: z.custom<Content>((val) => typeof val === 'object' && val !== null, {
        message: 'Invalid Content',
    })
});


export const RenameFileFolderFormSchema =
    z.object({
        name: z.string()
            .min(1, 'Name required')
            .nonempty({ message: 'Name required' })
    });

export const InfoFileFolderFormSchema = (fileFolder?: FileWithOwnerAndOmit[]) =>
    z.object({
        name: z.string()
            .min(1, 'Name required')
            .nonempty({ message: 'Name required' })
            .refine((value) => {
                const existingItem = fileFolder?.find(item => item.name === value);
                if (!existingItem) return true;

                const isFolder = existingItem.type === 'FOLDER';
                throw new z.ZodError([
                    {
                        code: 'custom',
                        message: `This ${isFolder ? 'folder' : 'file'} already exists.`,
                        path: ['name']
                    }
                ]);
            })
    });


export const GetFolderApiQuerySchema = z.object({
    folderId: z.string().cuid2().optional()
        .transform((val) => (val === undefined ? null : val)),
});

export const GetFileFolderByInputApiQuerySchema = z.object({
    nameFileOrFolder: z.string(),
});

export const DeleteFileFolderSchema = z.array(
    z.string().cuid2()
)
