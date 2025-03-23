'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage, } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { SignUpFormSchema } from '@/schemas/auth.schema';
import { onSubmitSignUpAction } from '@/actions/auth/signUp.action';


export function CredentialsSignUp() {
    const {
        form,
        handleSubmitWithAction,
        action: {
            isPending
        }
    } = useHookFormAction(onSubmitSignUpAction, zodResolver(SignUpFormSchema), {
        formProps: {
            defaultValues: {
                email: '',
                password: ''
            }
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-2">
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
                                <Input placeholder="Password" type={"password"} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending} loading={isPending}>Sign Up with Email</Button>
            </form>
        </Form>
    )
}
