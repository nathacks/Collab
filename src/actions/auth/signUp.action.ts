'use server';

import { actionServer } from '@/lib/api/safe-action';
import { SignInFormSchema, SignUpFormSchema } from '@/schemas/auth.schema';
import { returnValidationErrors } from 'next-safe-action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { GlobalError } from '@/errors/global.error';
import { signUpUserWithPerm } from '@/modules/auth.module';
import { permanentRedirect } from 'next/navigation';


export const onSubmitSignUpAction = actionServer
    .schema(SignUpFormSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        try {
            const workspaceId = await signUpUserWithPerm(email, password);
            permanentRedirect(`/${workspaceId}/dashboard`);
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
