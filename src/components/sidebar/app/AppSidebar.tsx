'use client'

import { Calendar, File, LayoutDashboard, MessageCircleMore } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link';
import { WorkspaceMenu } from './workspace/WorkspaceMenu';
import { SidebarInviteUserButton } from '@/components/sidebar/app/workspace/invite/SidebarInviteUserButton';
import { useWorkspace } from '@/context/WorkspaceParams';
import { Badge } from '@/components/ui/badge';


interface AppSidebarProps {
    variant?: 'sidebar' | 'floating' | 'inset'
}

const items = [
    {
        title: 'File Manager',
        url: '/file-manager',
        icon: File,
    },
    {
        title: 'Chat',
        icon: MessageCircleMore,
        soon: true
    },
    {
        title: 'Calendar',
        icon: Calendar,
        soon: true
    }
]

export function AppSidebar({ variant }: AppSidebarProps) {
    const { setOpenMobile } = useSidebar()
    const { workspaceId } = useWorkspace()

    return (
        <Sidebar className={'whitespace-nowrap'} collapsible={'icon'} variant={variant}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <WorkspaceMenu/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={'overflow-hidden'}>
                <SidebarGroup>
                    <SidebarMenuButton asChild>
                        <Link onClick={() => setOpenMobile(false)} href={`/${workspaceId}/dashboard`}>
                            <LayoutDashboard/>
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarGroup>
                <SidebarSeparator/>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild={!item.soon}>
                                        {item.soon ? (
                                            <>
                                                <item.icon/>
                                                <span className={"flex-1"}>{item.title}</span>
                                                <Badge >Soon</Badge>
                                            </>
                                        ) : (
                                            <Link onClick={() => setOpenMobile(false)}
                                                  href={`/${workspaceId}/${item.url}`}>
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </Link>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarInviteUserButton/>
            </SidebarFooter>
        </Sidebar>
    )
}
