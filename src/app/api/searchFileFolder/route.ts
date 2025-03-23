import { authRouteServer } from '@/lib/api/nextRoute';
import { GetFileFolderByInputApiQuerySchema } from '@/schemas/file-manager.schema';
import { NextResponse } from 'next/server';
import { getFileFolderByInputWithPerm } from '@/modules/file.module';
import { GlobalError } from '@/errors/global.error';


export const GET = authRouteServer
    .query(GetFileFolderByInputApiQuerySchema)
    .handler(async (_req, { query: { nameFileOrFolder } }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const resFileFolder = await getFileFolderByInputWithPerm(nameFileOrFolder);
            return NextResponse.json(resFileFolder);
        } catch (error) {
            if (error instanceof GlobalError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: error.status }
                );
            }
        }
    });
