import { createZodRoute } from 'next-zod-route';
import { getUserSession } from '@/lib/auth-session';
import { NextResponse } from 'next/server';

const route = createZodRoute({
    handleServerError: (error: Error) => {
        return NextResponse.json({ message: error.message });
    },
});

export const authRouteServer = route.use(async ({ next }) => {
    const session = await getUserSession();
    if (!session) {
        return NextResponse.redirect('/sign-in');
    }

    return await next({
        ctx: { session },
    });
});
