'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { WorkspaceDisplay } from '@/components/sidebar/app/workspace/WorkspaceDisplay';
import { WorkspaceWithRole } from '@/models/workspace.model';
import { usePushRouterWorkspace } from '@/hooks/utils/PushRouterWorkspace';

interface ItemSelectWorkspaceProps {
    workspace: WorkspaceWithRole;
}

export function ItemSelectWorkspace({ workspace }: ItemSelectWorkspaceProps) {
    const pushRouterWorkspace = usePushRouterWorkspace()

    return (
        <DropdownMenuItem className={'focus:bg-secondary w-full focus:text-foreground cursor-pointer flex'}
                          onClick={() => pushRouterWorkspace(workspace.id)}>
            <WorkspaceDisplay workspace={workspace}/>
        </DropdownMenuItem>
    )
}
