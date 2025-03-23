'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown, Plus, Settings, Users } from 'lucide-react';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useWorkspace } from '@/context/WorkspaceParams';
import Link from 'next/link';
import { WorkspaceDisplay } from '@/components/sidebar/app/workspace/WorkspaceDisplay';
import { OtherWorkspace } from '@/components/sidebar/app/workspace/OtherWorkspace';
import { CreateWorkspaceForm } from '@/components/forms/CreateWorkspaceForm';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';


export function WorkspaceMenu() {
    const { openDialog } = useConfirmationDialogStore();
    const { state, setOpenMobile } = useSidebar()
    const { workspace, roleInWorkspace } = useWorkspace();

    const workspacePanels = [
        { label: 'Setting Workspace', icon: Settings, href: './setting-workspace', roleIdRequire: 2 },
        {
            label: 'Manage users',
            icon: Users,
            href: './manage-users',
            roleIdRequire: 2,
            isPersonal: workspace.isPersonal
        },
    ]

    const isRoleAccepted = (userRoleId: number) => roleInWorkspace.id >= userRoleId
    const workspacePanelsFilterAccess = workspacePanels.filter((workspacePanel) => isRoleAccepted(workspacePanel.roleIdRequire) && !workspacePanel.isPersonal)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size={'lg'}>
                    <WorkspaceDisplay workspace={workspace} sizeLabel={'text-base'} withDesc={false}/>
                    <ChevronsUpDown className="ml-auto"/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={state === 'collapsed' ? 'right' : 'bottom'}
                                 className={cn('flex flex-col gap-1 !p-0', {
                                     'mt-4': state === 'collapsed',
                                     'w-[--radix-popper-anchor-width]': state === 'expanded'
                                 })}>
                <div className={'px-1 pt-1'}>
                    <WorkspaceDisplay className={'p-2 cursor-default'} workspace={workspace}/>
                    {workspacePanelsFilterAccess.map((panel, index) => (
                        <DropdownMenuItem key={index} asChild>
                            <Link onClick={() => setOpenMobile(false)} href={panel.href}>
                                <panel.icon/>
                                <span>{panel.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </div>
                <Separator className={'!w-full'}/>
                <div className={'px-1 pb-1'}>
                    <OtherWorkspace/>
                    <DropdownMenuItem onClick={() => {
                        setOpenMobile(false);
                        openDialog({
                            title: 'Create a New Workspace',
                            description: 'Enter a workspace name.',
                            content: <CreateWorkspaceForm/>
                        })
                    }}>
                        <Plus/>
                        <span>New workspace</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
