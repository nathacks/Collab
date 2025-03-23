'use client'

import { createContext, ReactNode, useContext } from 'react';
import { WorkspaceWithRole } from '@/models/workspace.model';
import { UserRoleInWorkspaceRole } from '@/models/userOnWorkspace.model';

type WorkspaceContextType = {
    workspaceId: string;
    workspaces: WorkspaceWithRole[];
    workspace: WorkspaceWithRole;
    roleInWorkspace: UserRoleInWorkspaceRole;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceParamsProvider = ({
                                            workspaceId,
                                            workspaces,
                                            workspace,
                                            roleInWorkspace,
                                            children,
                                        }: {
    workspaceId: string;
    workspaces: WorkspaceWithRole[];
    workspace: WorkspaceWithRole;
    children: ReactNode;
    roleInWorkspace: UserRoleInWorkspaceRole
}) => {

    return (
        <WorkspaceContext.Provider value={{ workspaceId, workspaces, workspace, roleInWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error('useWorkspace must be used within a WorkspaceProvider');
    }
    return context;
};
