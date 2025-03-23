import { authRouteServer } from '@/lib/api/nextRoute';
import { NextResponse } from 'next/server';
import { getAllRoleByWorkspaceId } from '@/services/role/role.service';

export const GET = authRouteServer
    .handler(async (_req, { query: { workspaceId } }) => {
        const roles = await getAllRoleByWorkspaceId(workspaceId)
        return NextResponse.json(roles);
    });
