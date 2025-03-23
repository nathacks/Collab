import useSWR from 'swr';
import { useWorkspace } from '@/context/WorkspaceParams';
import { fetcherApi } from '@/hooks/api/fetcherApi';

const order = ['OWNER', 'ADMIN', 'MEMBER', 'GUEST'];

export function useGetAllRolesInWorkspace() {
    const { workspaceId } = useWorkspace();

    const { data: roles } = useSWR<{
        id: number, name: string
    }[]>(`/api/permission/role?workspaceId=${workspaceId}`, fetcherApi)

    return roles?.sort((a, b) => {
        return order.indexOf(a.name) - order.indexOf(b.name);
    })
}
