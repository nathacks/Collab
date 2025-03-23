import { createSafeActionClient } from 'next-safe-action';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth-session';

export const actionServer = createSafeActionClient({
    handleServerError() {
    },
})

export const authActionServer = actionServer
    .use(async ({ next }) => {
        const session = await getUserSession()
        if (!session) redirect('/sign-in');

        return next({ ctx: { session } });
    });
