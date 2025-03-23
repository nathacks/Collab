import { SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/header/Header';
import { AppSidebar } from '@/components/sidebar/app/AppSidebar';

export default async function WorkspaceLayout({
                                                  children,
                                              }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <AppSidebar variant={'inset'}/>
            <div className={'flex flex-col w-full h-screen'}>
                <Header/>
                <SidebarInset className={'!mt-0 !min-h-0'}>
                    {children}
                </SidebarInset>
            </div>
        </>
    );
}
