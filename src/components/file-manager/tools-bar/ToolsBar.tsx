'use client'

import { Button } from '@/components/ui/button';
import { File, Folder, Pencil, Trash } from 'lucide-react';
import { useDataTableStore } from '@/stores/dataTable.store.ts';
import * as React from 'react';
import { RefreshButton } from '@/components/file-manager/tools-bar/RefreshButton';
import { Separator } from '@/components/ui/separator';
import { PreviousFolderButton } from '@/components/file-manager/tools-bar/PreviousFolderButton';
import { Badge } from '@/components/ui/badge';
import { useAlertConfirmationDialogStore } from '@/stores/alertConfirmationDialog.store';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { RenameFileFolderForm } from '@/components/forms/RenameFileFolderForm';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CreateFileForm } from '@/components/forms/file-manager/CreateFileForm';
import { CreateFolderForm } from '@/components/forms/file-manager/CreateFolderForm';
import { useDeleteFileFolder } from '@/hooks/action/useDeleteFileFolder';
import { OpenButton } from '@/components/file-manager/tools-bar/OpenButton';
import { withPermissionRole } from '@/components/permissions/withPermissionRole';


export function ToolsBar() {
    const { rowSelection } = useDataTableStore();
    const onSubmitDeleteFileFolder = useDeleteFileFolder();

    const PermissionRoleButton = withPermissionRole(Button, 1)

    const {
        openAlertDialog,
    } = useAlertConfirmationDialogStore();
    const { openDialog } = useConfirmationDialogStore()

    const selectedKeys = Object.keys(rowSelection).map(Number);

    const selectedCount = selectedKeys.length;
    const hasSelection = selectedCount > 0;
    const isSingleSelection = selectedCount === 1;

    return (
        <div className="flex m-3 h-10 items-center">
            <div className="flex flex-1 h-8 items-center gap-3">
                <RefreshButton/>
                <PreviousFolderButton/>
                {hasSelection && (
                    <>
                        <Separator orientation="vertical"/>
                        {isSingleSelection && (
                            <>
                                <OpenButton/>
                                <PermissionRoleButton icon={<Pencil/>} onClick={() => {
                                    openDialog({
                                        title: 'Are you sure you want to delete?',
                                        description: 'This action cannot be undone. Deleting this data will permanently remove.',
                                        content: <RenameFileFolderForm/>
                                    })
                                }}>Rename</PermissionRoleButton>
                            </>
                        )}
                        <PermissionRoleButton variant="destructive" onClick={() => {
                            openAlertDialog({
                                title: 'Are you sure you want to delete?',
                                description: 'This action cannot be undone. Deleting this data will permanently remove.',
                                cancelLabel: 'Cancel',
                                actionLabel: 'Delete',
                                onAction: onSubmitDeleteFileFolder,
                            })
                        }}>
                            {selectedCount > 1 ? <Badge variant={'destructive'}
                                                        className={'bg-secondary text-destructive hover:bg-secondary'}>{selectedCount}</Badge> :
                                <Trash/>} Delete
                        </PermissionRoleButton>
                    </>
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <PermissionRoleButton>Create</PermissionRoleButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[10rem]">
                    <DropdownMenuItem onClick={() => {
                        openDialog({
                            title: 'Create a New File',
                            description: 'Enter a file name and select or specify an extension to create a new file.',
                            content: <CreateFileForm/>
                        })
                    }}>
                        <File/> File
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        openDialog({
                            title: 'Create a New Folder',
                            description: 'Enter a folder name.',
                            content: <CreateFolderForm/>
                        })
                    }}>
                        <Folder/> Folder
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/*<CreateButton/>*/}
        </div>
    );
}
