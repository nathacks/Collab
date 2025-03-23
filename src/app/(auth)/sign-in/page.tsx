import CollabIcon from '../../../../public/logo/collab-simple.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { CredentialsSignIn } from '@/components/auth/CredentialsSignIn';
import { ToggleTheme } from '@/components/ToggleTheme';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth-session';

export default async function SignInPage() {
    const session = await getUserSession()
    if (session) redirect('/');

    return (
        <div className={'flex flex-1 flex-col'}>
            <div className={'flex m-2 items-center justify-between'}>
                <Image src={CollabIcon} className={'size-12'} alt={''}/>
                <div className={'flex items-center gap-2'}>
                    <ToggleTheme className={'size-10'}/>
                    <Separator orientation={'vertical'} className={'h-5'}/>
                    <Button asChild variant={'ghost'}>
                        <Link href={'/sign-up'}>Register</Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center w-full max-w-md px-3 mb-52 mx-auto gap-5">
                <div className={'flex flex-col gap-2'}>
                    <h1 className="text-4xl font-bold">Welcome back</h1>
                    <span className="text-sm">Sign in to access your account</span>
                </div>
                <CredentialsSignIn/>
            </div>
        </div>
    )
};

