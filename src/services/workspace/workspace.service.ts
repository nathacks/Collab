import { prisma } from '@/lib/prisma/prisma';
import { GlobalError } from '@/errors/global.error';
import { getAllRoleAndId } from '@/services/role/role.service';
import { WorkspaceWithRole, WORSPACE_INCLUDE_MEMBERS } from '@/models/workspace.model';
import { getUserSession } from '@/lib/auth-session';


export async function addWorkspace(name: string, isPersonal: boolean = false, userId?: string) {
    const userSession = await getUserSession()

    const { idOfNameRole } = await getAllRoleAndId('OWNER')

    try {
        const workspace = await prisma.workspace.create({
            data: {
                name,
                ownerId: (userSession?.user.id ?? userId)!,
                isPersonal,
                members: {
                    create: {
                        userId: (userSession?.user.id ?? userId)!,
                        roleId: idOfNameRole!
                    }
                }
            }
        })

        return workspace.id;
    } catch (e) {
        throw new Error('Error creating workspace')
    }
}

export async function getAllWorkspaceByUserId(): Promise<WorkspaceWithRole[]> {
    const userSession = await getUserSession()

    return prisma.workspace.findMany({
        where: {
            OR: [
                { ownerId: userSession?.user.id },
                { members: { some: { userId: userSession?.user.id } } },
            ],
        },
        include: WORSPACE_INCLUDE_MEMBERS
    });
}

export async function getWorkspaceIdByUserId(userId?: string) {
    const userSession = await getUserSession()

    return prisma.workspace.findFirst({
        where: { ownerId: userId ?? userSession?.user.id, isPersonal: true },
    });
}


export async function isWorkspacePersonal(workspaceId: string) {
    try {
        const workspacePersonal = await prisma.workspace.findFirst({
            where: { id: workspaceId, isPersonal: true },
        });

        return workspacePersonal?.isPersonal
    } catch (e) {
        throw new GlobalError({ message: 'Error find workspace id' })
    }
}


export async function renameWorkspaceByName(workspaceId: string, newName: string) {
    try {
        return await prisma.workspace.update({
            where: { id: workspaceId },
            data: { name: newName },
        });
    } catch (e) {
        throw new GlobalError({ message: 'Error renaming workspace' });
    }
}

export async function deleteWorkspaceById(workspaceId: string) {
    try {
        return await prisma.workspace.delete({
            where: { id: workspaceId, isPersonal: false },
        });
    } catch (e) {
        throw new GlobalError({ message: 'This workspace cannot be deleted' });
    }
}
