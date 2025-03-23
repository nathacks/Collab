import { prisma } from '@/lib/prisma/prisma';
import { GlobalError } from '@/errors/global.error';
import { Invitation, User } from '@prisma/client';
import { addUserToWorkspace } from '@/services/user/userOnWorkspace.service';


export async function checkInvitation(invitationsUser: Invitation[], newUser: User) {
    try {
        for (const invitationUser of invitationsUser) {
            await addUserToWorkspace(newUser.id, invitationUser.workspaceId, invitationUser.roleId);
            await deleteInvitationUser(newUser.email, invitationUser.workspaceId);
        }
    } catch (e) {
        throw new Error('Invitation Error');
    }
}

export async function inviteOrAddWorkspaceUsers(workspaceId: string, emails: { value: string }[], roleId: number) {
    const invitations = [];

    for (const emailObj of emails) {
        const email = emailObj.value;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            await addUserToWorkspace(existingUser.id, workspaceId, roleId);
        } else {
            const invitation = await addInvitationUser(email, workspaceId, roleId);
            invitations.push(invitation);
        }
    }

    return invitations;
}

export async function addInvitationUser(email: string, workspaceId: string, roleId: number) {
    try {
        return prisma.invitation.create({
            data: {
                email,
                workspaceId,
                roleId,
            },
        });
    } catch (e) {
        throw new GlobalError({ message: 'Failed to create invitation user' });
    }
}

export async function getAllInvitationUser(email: string): Promise<Invitation[]> {
    return prisma.invitation.findMany({
        where: { email }
    });
}

export async function getWorkspaceInvitedUsersWithRole(workspaceId: string) {
    try {
        return await prisma.invitation.findMany({
            where: { workspaceId },
            include: {
                role: true,
            },
        });
    } catch (e) {
        throw new Error('Failed to get invited users on workspace');
    }
}

export async function deleteInvitationUser(email: string, workspaceId: string): Promise<Invitation> {
    try {
        return await prisma.invitation.delete({
            where: {
                id: { email, workspaceId },
            }
        });
    } catch (e) {
        throw new Error('Failed to remove invitation user');
    }
}

export async function updateInvitationRoleUser(email: string, workspaceId: string, newRoleId: number): Promise<Invitation> {
    try {
        return await prisma.invitation.update({
            where: {
                id: {
                    email,
                    workspaceId,
                },
            },
            data: {
                roleId: newRoleId,
            },
        });
    } catch (e) {
        throw new Error('Failed to update role invitation user');
    }
}
