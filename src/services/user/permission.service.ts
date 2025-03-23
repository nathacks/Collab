import { GlobalError } from '@/errors/global.error';
import { getUserSession } from '@/lib/auth-session';
import { PermissionTag } from '@prisma/client';
import { getUserRoleInWorkspace } from '@/services/user/userOnWorkspace.service';

export async function getUserPermissions(workspaceId: string, options?: {
    permissionsName?: PermissionTag[], roleName?: string
}) {
    const userSession = await getUserSession();

    const userOnWorkspace = await getUserRoleInWorkspace(workspaceId, userSession?.user.id!)

    if (!userOnWorkspace) throw new GlobalError({
        message: 'L\'utilisateur n\'appartient pas à ce workspace.',
        status: 401
    });

    const outputUserPermission = {
        roleUser: userOnWorkspace.role,
        userSession,
        userOnWorkspace,
        options
    };

    if (userOnWorkspace.role.name === 'OWNER') return outputUserPermission

    const hasRole = options?.roleName ? userOnWorkspace.role.name === options.roleName : false;

    const hasPermissions = options?.permissionsName ? options.permissionsName.every(permissionName =>
        userOnWorkspace.role.rolePermission.some(rp => rp.permissionTag === permissionName)
    ) : false;

    if (!hasRole && !hasPermissions) {
        throw new GlobalError({
            message: 'Rôle ou permissions requis non accordés.',
            status: 401
        });
    }

    return outputUserPermission
}

