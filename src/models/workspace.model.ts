import { Prisma } from '@prisma/client';

const validator = Prisma.validator<Prisma.WorkspaceDefaultArgs>()({
    include: {
        members: {
            include: {
                role: true
            },
        },
    },
});

export const WORSPACE_INCLUDE_MEMBERS = validator.include;

export type WorkspaceWithRole = Prisma.WorkspaceGetPayload<typeof validator>


export type WorkspaceUserWithRole = Prisma.UserOnWorkspaceGetPayload<{
    include: {
        user: {
            select: {
                id: true;
                name: true;
                email: true;
                image: true;
            }
        },
        role: true
    }
}>;
