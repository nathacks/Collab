import { redirect } from 'next/navigation';
import { getWorkspaceIdByUserId } from '@/services/workspace/workspace.service';

export default async function DefaultPage() {
    const workspaceId = await getWorkspaceIdByUserId()

    if (!workspaceId) redirect(`/sign-up`);

    redirect(`/${workspaceId.id}/dashboard`);
}
