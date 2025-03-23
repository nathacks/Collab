import { Prisma } from '@prisma/client';

const validator = Prisma.validator<Prisma.UserOnWorkspaceDefaultArgs>()({
    include: {
        role: {
            select: {
                id: true,
                name: true,
                rolePermission: {
                    select: {
                        permissionTag: true,
                    }
                },
            }
        }
    },
});

export const USER_ON_WORKSPACE_INCLUDE_ROLE = validator.include;

export type UserRoleInWorkspace = Prisma.UserOnWorkspaceGetPayload<typeof validator>;
export type UserRoleInWorkspaceRole = Prisma.UserOnWorkspaceGetPayload<typeof validator>['role'];
