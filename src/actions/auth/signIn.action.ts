'use server';

import { SignInFormSchema } from '@/schemas/auth.schema';
import { returnValidationErrors } from 'next-safe-action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { actionServer } from '@/lib/api/safe-action';
import { GlobalError } from '@/errors/global.error';
import { signInUserWithPerm } from '@/modules/auth.module';
import { permanentRedirect } from 'next/navigation';

export const onSubmitSignInAction = actionServer
    .schema(SignInFormSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        try {
            const workspace = await signInUserWithPerm(email, password)
            if (!workspace) throw new GlobalError({ message: 'Contact your Admin : Error find workspace' })

            permanentRedirect(`/${workspace.id}/dashboard`);
        } catch (error) {
            if (isRedirectError(error)) throw error;
            if (error instanceof GlobalError) {
                return returnValidationErrors(SignInFormSchema, {
                    email: {
                        _errors: [error.message],
                    }
                });
            }
        }
    });
