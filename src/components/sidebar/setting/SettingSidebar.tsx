'use client'

import { ArrowLeft, Settings, Users } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWorkspace } from '@/context/WorkspaceParams';


interface SettingSidebarProps {
    variant?: 'sidebar' | 'floating' | 'inset'
}

export function SettingSidebar({ variant }: SettingSidebarProps) {
    const { workspace, roleInWorkspace, workspaceId } = useWorkspace();
    const { setOpenMobile } = useSidebar()

    const workspacePanels = [
        {
            title: 'Setting Workspace',
            url: 'setting-workspace',
            icon: Settings,
            roleIdRequire: 2
        },
        {
            title: 'Manage users',
            url: 'manage-users',
            icon: Users,
            roleIdRequire: 2,
            isPersonal: workspace.isPersonal
        },
    ]

    const isRoleAccepted = (userRoleId: number) => roleInWorkspace.id >= userRoleId
    const workspacePanelsFilterAccess = workspacePanels.filter((workspacePanel) => isRoleAccepted(workspacePanel.roleIdRequire) && !workspacePanel.isPersonal)

    return (
        <Sidebar className={'whitespace-nowrap'} collapsible={'icon'} variant={variant}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={'lg'} asChild>
                            <Link onClick={() => setOpenMobile(false)} href={`/${workspaceId}/dashboard`}>
                                <div className={cn('flex text-sm items-center gap-2')}>
                                    <div
                                        className={'flex justify-center items-center bg-sidebar-ring [&>svg]:size-4 text-sidebar-primary-foreground min-w-8 min-h-8 rounded-lg'}>
                                        <ArrowLeft/>
                                    </div>
                                    <span className={cn('font-semibold')}>Back to workspace</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={'overflow-hidden'}>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {workspacePanelsFilterAccess.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link onClick={() => setOpenMobile(false)} href={`/${workspaceId}/${item.url}`}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
