import { ComponentType } from 'react';
import { useWorkspace } from '@/context/WorkspaceParams';

export function withPermissionRole<P extends object>(
    WrappedComponent: ComponentType<P>,
    roleIdAccepted: number
) {
    const { roleInWorkspace } = useWorkspace()

    const checkPermissionRole = roleInWorkspace.id < roleIdAccepted

    return (props: P) => {
        if (checkPermissionRole) return null;

        return <WrappedComponent {...props} />;
    };
}
