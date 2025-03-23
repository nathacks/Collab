import { notFound, redirect } from 'next/navigation';
import { getAllWorkspaceByUserId } from '@/services/workspace/workspace.service';
import { WorkspaceParamsProvider } from '@/context/WorkspaceParams';
import { WorkspaceProviders } from '@/app/[workspaceId]/WorkspaceProviders';
import { getUserRoleInWorkspace } from '@/services/user/userOnWorkspace.service';
import { AiChat } from '@/components/ai/AiChat';
import { getUserSession } from '@/lib/auth-session';

export default async function WorkspaceLayout({
                                                  children,
                                                  params,
                                              }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ workspaceId: string }>
}>) {
    const session = await getUserSession()
    if (!session) redirect('/sign-in');

    const { workspaceId } = await params
    const workspaces = await getAllWorkspaceByUserId()

    const workspace = workspaces.find((workspace) => workspace.id === workspaceId);
    if (!workspace) notFound()

    const role = await getUserRoleInWorkspace(workspaceId, session.user.id)

    return (
        <WorkspaceParamsProvider workspaceId={workspaceId} workspaces={workspaces} workspace={workspace}
                                 roleInWorkspace={role!.role}>
            <WorkspaceProviders>
                {children}
                <AiChat/>
            </WorkspaceProviders>
        </WorkspaceParamsProvider>
    );
}
