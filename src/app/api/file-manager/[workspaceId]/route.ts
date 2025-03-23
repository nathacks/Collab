import { authRouteServer } from '@/lib/api/nextRoute';
import { GetFolderApiQuerySchema } from '@/schemas/file-manager.schema';
import { NextResponse } from 'next/server';
import { getFolderWithPerm } from '@/modules/file.module';
import { GlobalError } from '@/errors/global.error';
import { WorkspaceApiParamsSchema } from '@/schemas/workspace.schema';


export const GET = authRouteServer
    .params(WorkspaceApiParamsSchema)
    .query(GetFolderApiQuerySchema)
    .handler(async (_req, { params: { workspaceId }, query: { folderId } }) => {
        try {
            const resFileFolder = await getFolderWithPerm(workspaceId, folderId);
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
