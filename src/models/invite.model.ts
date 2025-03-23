import { Prisma } from '@prisma/client';

export type WorkspaceInvitedUserWithRole = Prisma.InvitationGetPayload<{
    include: {
        role: true
    }
}>;
