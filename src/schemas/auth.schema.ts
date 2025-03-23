import { z } from 'zod';

export const SignInFormSchema = z.object({
    email: z
        .string()
        .nonempty({ message: 'Email required' })
        .email(),
    password: z
        .string()
        .nonempty({ message: 'Password required' })
})

export const SignUpFormSchema = z.object({
    email: z
        .string()
        .nonempty({ message: 'Email required' })
        .email(),
    password: z
        .string()
        .nonempty({ message: 'Password required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
})
