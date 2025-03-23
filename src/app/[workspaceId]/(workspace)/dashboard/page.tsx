import { UsersChart } from '@/components/dashboard/UsersChart';
import { getUserGrowthInWorkspace } from '@/services/user/userOnWorkspace.service';
import { FilesChart } from '@/components/dashboard/FilesChart';
import { getFileCountInWorkspace, getFolderCountInWorkspace } from '@/services/file-manager/file.service';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FoldersChart } from '@/components/dashboard/FoldersChart';
import { LastChat } from '@/components/dashboard/LastChat';
import { CalendarUI } from '@/components/dashboard/CalendarUI';
import { isWorkspacePersonal } from '@/services/workspace/workspace.service';

export default async function DashboardPage({ params }: { params: Promise<{ workspaceId: string }> }) {
    const { workspaceId } = await params;

    const isPersonal = await isWorkspacePersonal(workspaceId);

    const users = await getUserGrowthInWorkspace(workspaceId);

    const fileCount = await getFileCountInWorkspace(workspaceId);
    const folderCount = await getFolderCountInWorkspace(workspaceId);

    return (
        <ScrollArea className={'flex-1 px-4'}>
            <div className={'flex flex-col py-4 flex-1 gap-4'}>
                <div className={'flex lg:flex-row flex-col gap-4'}>
                    <FilesChart fileCount={fileCount}/>
                    <FoldersChart folderCount={folderCount}/>
                    {!isPersonal ? <UsersChart users={users}/> : <LastChat/>}
                </div>
                <div className={'flex flex-1 lg:flex-row flex-col  gap-4'}>
                    <CalendarUI/>
                    {!isPersonal && <LastChat/>}
                </div>
            </div>
        </ScrollArea>
    );
}




