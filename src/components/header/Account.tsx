import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AvatarDisplay } from '@/components/utils/AvatarDisplay';
import { getUserSession, signOut } from '@/lib/auth-session';

import { LogOut } from 'lucide-react';

export async function Account() {
    const session = await getUserSession()

    const handleSignOut = async () => {
        'use server'

        await signOut()
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <AvatarDisplay seed={session?.user.name!}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="min-w-[10rem]"
            >
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut/> Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
