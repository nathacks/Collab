import CollabIcon from '../../../../public/logo/collab-simple.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CredentialsSignUp } from '@/components/auth/CredentialsSignUp';
import { ToggleTheme } from '@/components/ToggleTheme';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth-session';
import Image from 'next/image';

export default async function SignUpPage() {
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
                        <Link href={'/sign-in'}>Login</Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center w-full max-w-md px-3 mb-52 mx-auto gap-5">
                <div className={'flex flex-col gap-2'}>
                    <h1 className="text-4xl font-bold">Create an account</h1>
                    <span className="text-sm">Enter your email and password below to create your account</span>
                </div>
                <CredentialsSignUp/>
            </div>
        </div>
    )
};

