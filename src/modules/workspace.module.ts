import { getUserPermissions } from '@/services/user/permission.service';
import {
    deleteInvitationUser,
    inviteOrAddWorkspaceUsers,
    updateInvitationRoleUser
} from '@/services/user/invitationUser.service';
import {
    addWorkspace,
    deleteWorkspaceById,
    getWorkspaceIdByUserId,
    isWorkspacePersonal,
    renameWorkspaceByName
} from '@/services/workspace/workspace.service';
import { createWorkspaceFolder, deleteWorkspaceFolder } from '@/services/file-manager/fileManager.service';
import { Workspace } from '@prisma/client';
import { GlobalError } from '@/errors/global.error';
import {
    deleteUserInWorkspace,
    getUserRoleInWorkspace,
    updateUserRoleInWorkspace
} from '@/services/user/userOnWorkspace.service';

export async function createWorkspaceWithPerm(name: string, isPersonal: boolean = false, userId?: string) {
    const id = await addWorkspace(name, isPersonal, userId)
    await createWorkspaceFolder(id)
    return id
}

export async function deleteWorkspaceWithPerm(workspaceId: string): Promise<Workspace | null> {
    return getUserPermissions(workspaceId)
        .then(async () => {
            const isPersonal = await isWorkspacePersonal(workspaceId)
            if (isPersonal) throw new GlobalError({ message: 'Cannot delete personal workspace' })

            const deletedWorkspaceId = await deleteWorkspaceById(workspaceId)
            await deleteWorkspaceFolder(deletedWorkspaceId.id)
            return getWorkspaceIdByUserId()
        })
}

export async function renameWorkspaceWithPerm(workspaceId: string, newName: string): Promise<Workspace> {
    return getUserPermissions(workspaceId)
        .then(async () => renameWorkspaceByName(workspaceId, newName))
}

export async function addUsersInWorkspaceWithPerm(workspaceId: string, emails: { value: string }[], roleId: number) {
    return getUserPermissions(workspaceId, { permissionsName: ['INVITE'] })
        .then(async () => {
            const isPersonal = await isWorkspacePersonal(workspaceId)
            if (isPersonal) throw new GlobalError({ message: 'Cannot invite in personal workspace' })

            return inviteOrAddWorkspaceUsers(workspaceId, emails, roleId)
        })
}

export async function removeUserInWorkspaceWithPerm(workspaceId: string, { userId, email }: {
    userId?: string; email?: string
}) {
    const resRemoveUserInWorkspace = { workspaceId, userId, email }

    return getUserPermissions(workspaceId, { roleName: 'ADMIN' })
        .then(async ({ roleUser }) => {
            if (userId) {
                const roleUserOfremoveUserId = await getUserRoleInWorkspace(workspaceId, userId)
                if (roleUser.id <= roleUserOfremoveUserId!.role.id) throw new GlobalError({ message: 'Error revoke/delete user in workspace' });

                await deleteUserInWorkspace(workspaceId, userId)
                return resRemoveUserInWorkspace
            }

            await deleteInvitationUser(email!, workspaceId)
            return resRemoveUserInWorkspace
        })
}

export async function updateUserRoleWithPerm(workspaceId: string, newRoleId: number, { userId, email }: {
    userId?: string; email?: string
}) {
    const resUpdateRoleUser = { workspaceId, newRoleId, userId, email }

    return getUserPermissions(workspaceId, { roleName: 'ADMIN' })
        .then(async ({ roleUser }) => {
            if (userId) {
                const roleUserOfremoveUserId = await getUserRoleInWorkspace(workspaceId, userId)
                if (roleUser.id <= roleUserOfremoveUserId!.role.id) throw new GlobalError({ message: 'Error update role user' });

                await updateUserRoleInWorkspace(workspaceId, newRoleId, userId)
                return resUpdateRoleUser
            }

            await updateInvitationRoleUser(email!, workspaceId, newRoleId)
            return resUpdateRoleUser
        })
}
