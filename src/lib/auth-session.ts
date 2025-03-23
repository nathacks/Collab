import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getUserSession() {
    return auth.api.getSession({
        headers: await headers()
    })
}

export async function signOut() {
    try {
        return await auth.api.signOut({
            headers: await headers()
        })
    } catch (e) {
        throw new Error('Error signOut user session');
    }
}
