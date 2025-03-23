import { GlobalError } from '@/errors/global.error';
import { prisma } from '@/lib/prisma/prisma';
import { getUserRoleInWorkspace } from '@/services/user/userOnWorkspace.service';
import { getUserSession } from '@/lib/auth-session';

export async function getAllRoleByWorkspaceId(workspaceId: string) {
    const userSession = await getUserSession();
    const userRoleInWorkspace = await getUserRoleInWorkspace(workspaceId, userSession?.user.id!)

    try {
        return await prisma.role.findMany({
            select: {
                id: true,
                name: true
            },
            where: {
                NOT: [
                    { id: { gte: userRoleInWorkspace?.roleId } },
                    { name: 'OWNER' }
                ]
            }
        });
    } catch (e) {
        throw new GlobalError({ message: 'Error in all Roles' });
    }
}

export async function getAllRoleAndId(nameRole: string) {
    try {
        const allRoles = await prisma.role.findMany({
            select: {
                id: true,
                name: true
            }
        });

        const idOfNameRole = allRoles.find(role => role.name === nameRole)?.id

        return { allRoles, idOfNameRole };
    } catch (e) {
        throw new GlobalError({ message: 'Error in all Roles' });
    }
}
