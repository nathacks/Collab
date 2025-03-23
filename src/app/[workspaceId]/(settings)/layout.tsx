import { SettingSidebar } from '@/components/sidebar/setting/SettingSidebar';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { getUserPermissions } from '@/services/user/permission.service';
import { redirect } from 'next/navigation';


export default async function SettingsLayout({
                                                 children,
                                                 params
                                             }: Readonly<{
    children: React.ReactNode
    params: Promise<{ workspaceId: string }>
}>) {
    const { workspaceId } = await params

    try {
        await getUserPermissions(workspaceId, { roleName: 'ADMIN' })
    } catch (e) {
        redirect(`/${workspaceId}/dashboard`);
    }

    return (
        <>
            <SettingSidebar variant={'inset'}/>
            <div className={'flex vf flex-1 my-4 mr-4 md:ml-0'}>
                <SidebarTrigger className={"md:hidden mx-2"}/>
                <SidebarInset className={'!mt-0 !min-h-0 rounded-xl'}>
                    {children}
                </SidebarInset>
            </div>
        </>
    );
}
