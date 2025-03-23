'use client'

import { ToolsBar } from '@/components/file-manager/tools-bar/ToolsBar';
import { useEffect } from 'react';
import { useFileManagerStore } from '@/stores/files.store';
import { useSearchParams } from 'next/navigation';
import { useWorkspace } from '@/context/WorkspaceParams';
import { columnsFile } from '@/components/file-manager/table/ColumnsFile';
import { DataTableFile } from '@/components/file-manager/table/DataTableFile';
import { useGetFolder } from '@/hooks/api/getFolder';


export default function FileManagerPage() {
    const filesFolders = useFileManagerStore(state => state.filesFolders);
    const searchParams = useSearchParams()
    const getFileFolder = useGetFolder()

    const { workspaceId } = useWorkspace();

    const folderId = searchParams.get('folder');

    useEffect(() => {
        getFileFolder(workspaceId, folderId)
    }, [workspaceId, folderId])

    return (
        <div className={'flex h-full'}>
            <div className={'flex flex-col flex-1'}>
                <ToolsBar/>
                <DataTableFile columns={columnsFile} data={filesFolders.children}/>
            </div>
        </div>
    )
}
