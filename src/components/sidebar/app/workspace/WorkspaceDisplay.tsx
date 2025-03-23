import { formatStringFirstUpAllLower } from '@/utils/formatStringFirstUpAllLower';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { Home } from 'lucide-react';
import { AvatarDisplay } from '@/components/utils/AvatarDisplay';
import { WorkspaceWithRole } from '@/models/workspace.model';
import { useSidebar } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';


interface WorkspaceItemProps extends HTMLAttributes<HTMLDivElement> {
    workspace: WorkspaceWithRole;
    withDesc?: boolean;
    sizeLabel?: 'text-base' | 'text-sm'
}

export function WorkspaceDisplay({ workspace, className, sizeLabel, withDesc = true, ...props }: WorkspaceItemProps) {
    const { data: session } = authClient.useSession()

    const { state } = useSidebar()

    const currentUserInWorkspace = workspace.members.find(user => user.userId === session?.user.id);

    const roleName = workspace?.isPersonal ? 'PERSONAL' : currentUserInWorkspace?.role.name;

    const memberCount = workspace.members.length;
    const numberOfMembers = `• ${memberCount > 99 ? '99+' : memberCount} member${memberCount > 1 ? 's' : ''}`;

    return (
        <div
            className={cn('flex items-center gap-2 w-full text-sm', className, { 'truncate': state === 'expanded' })} {...props}>
            {workspace.isPersonal ? (
                <div
                    className="flex justify-center items-center bg-sidebar-ring text-sidebar-primary-foreground min-w-8 min-h-8 rounded-lg">
                    <Home className="size-4"/>
                </div>
            ) : (
                <AvatarDisplay seed={workspace.name}/>
            )}
            <div className="flex flex-col flex-1 min-w-0">
                <span className={cn('font-semibold truncate', sizeLabel)}>{workspace?.name}</span>
                {withDesc && (
                    <div className="flex text-secondary-foreground text-xs gap-1 items-center truncate">
                        <span className="truncate">{formatStringFirstUpAllLower(roleName)}</span>
                        {!workspace?.isPersonal && numberOfMembers}
                    </div>
                )}
            </div>
        </div>
    );
}

