import { useWorkspace } from '@/context/WorkspaceParams';


export const usePermissionRole = (roleIdAccepted: number) => {
    const { roleInWorkspace } = useWorkspace()

    return roleInWorkspace.id >= roleIdAccepted
};
