import { User } from '@prisma/client';
import { auth } from '@/lib/auth';
import { GlobalError } from '@/errors/global.error';

export async function checkUserCredentials(email: string, password: string): Promise<User> {
    const resSignIn = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    })

    const parseRes = await resSignIn.json()

    if (parseRes.code === 'INVALID_EMAIL_OR_PASSWORD') throw new GlobalError({ message: parseRes.message });

    return parseRes.user;
}

export async function InitializeNewUser(email: string, password: string): Promise<User> {
    const name = email.split('@')[0]

    const resSignUp = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        },
        asResponse: true
    })

    const parseRes = await resSignUp.json()

    if (parseRes.code === 'USER_ALREADY_EXISTS') throw new GlobalError({ message: 'Email already exists' });
    if (parseRes.code) throw new GlobalError({ message: parseRes.message });

    return parseRes.user;
}
