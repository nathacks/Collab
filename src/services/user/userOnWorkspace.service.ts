import { prisma } from '@/lib/prisma/prisma';
import { UserOnWorkspace } from '@prisma/client';
import { USER_ON_WORKSPACE_INCLUDE_ROLE, UserRoleInWorkspace } from '@/models/userOnWorkspace.model';

const threeMonthsAgo = new Date()
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

export function findAllWorkspaceByUserId(userId: string): any {
    return prisma.userOnWorkspace.findMany({
        where: { userId },
        include: {
            workspace: true,
        }
    });
}

export async function getWorkspaceUsersWithRoles(workspaceId: string) {
    try {
        return await prisma.userOnWorkspace.findMany({
            where: { workspaceId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                role: true,

            },
        });
    } catch (e) {
        throw new Error('Failed to get users role on workspace');
    }
}

export async function getUserRoleInWorkspace(workspaceId: string, userId: string): Promise<UserRoleInWorkspace | null> {
    try {
        return await prisma.userOnWorkspace.findUnique({
            where: {
                id: {
                    userId,
                    workspaceId,
                },
            },
            include: USER_ON_WORKSPACE_INCLUDE_ROLE
        });
    } catch (e) {
        throw new Error('Failed to get user role on workspace');
    }
}

export async function addUserToWorkspace(userId: string, workspaceId: string, roleId: number): Promise<UserOnWorkspace> {
    try {
        return await prisma.userOnWorkspace.create({
            data: { userId, workspaceId, roleId }
        });
    } catch (e) {
        throw new Error('Failed to add user to workspace');
    }
}

export async function deleteUserInWorkspace(workspaceId: string, userId: string) {
    try {
        return await prisma.userOnWorkspace.delete({
            where: {
                id: {
                    workspaceId,
                    userId
                },
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });
    } catch (e) {
        throw new Error('Error deleting user access');
    }
}

export async function updateUserRoleInWorkspace(workspaceId: string, newRoleId: number, userId: string): Promise<UserOnWorkspace> {
    try {
        return await prisma.userOnWorkspace.update({
            where: {
                id: {
                    userId,
                    workspaceId,
                },
            },
            data: {
                roleId: newRoleId,
            },
        });
    } catch (e) {
        throw new Error('Failed to update user role in workspace');
    }
}

export async function getUserGrowthInWorkspace(workspaceId: string) {
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    const userGrowth = await prisma.userOnWorkspace.findMany({
        where: {
            workspaceId,
            createdAt: {
                gte: threeMonthsAgo
            },
        },
        select: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    const groupedByDate = userGrowth.reduce((acc, entry) => {
        const date = entry.createdAt.toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    let cumulativeUsers = 0
    return Object.entries(groupedByDate).map(([date, users]) => {
        cumulativeUsers += users
        return { date, users: cumulativeUsers }
    })
}

export async function getInvitationNumberInWorkspace(workspaceId: string) {
    const invitationGrowth = await prisma.invitation.findMany({
        where: {
            workspaceId,
        },
        select: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    return invitationGrowth.length
}

