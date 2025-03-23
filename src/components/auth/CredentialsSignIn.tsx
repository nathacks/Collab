'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { onSubmitSignInAction } from '@/actions/auth/signIn.action';
import { SignInFormSchema } from '@/schemas/auth.schema';


export function CredentialsSignIn() {
    const {
        form,
        handleSubmitWithAction,
        action: {
            isPending
        }
    } = useHookFormAction(onSubmitSignInAction, zodResolver(SignInFormSchema), {
        formProps: {
            defaultValues: {
                email: '',
                password: ''
            }
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className={'flex flex-col gap-2'}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormMessage/>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormMessage/>
                            <FormControl>
                                <Input placeholder="Password" type={'password'} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending} loading={isPending}>Login</Button>
            </form>
        </Form>
    )
}
