'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button';
import { ArrowUpDown, File, Folder, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import dayjs from 'dayjs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownButtonDelete } from '@/components/file-manager/table/DropdownButtonDelete';
import { DropdownButtonRename } from '@/components/file-manager/table/DropdownButtonRename';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import { formatBytes } from '@/utils/formatBytes';
import { DropdownButtonInfo } from '@/components/file-manager/table/DropdownButtonInfo';


export const columnsFile: ColumnDef<FileWithOwnerAndOmit>[] = [
    {
        id: 'select',
        header: ({ table }) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            )
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                onClick={(e) => e.stopPropagation()}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <div className={'flex items-center gap-1'}>
                    <span>Name</span>
                    <Button
                        size={'icon'}
                        icon={<ArrowUpDown/>}
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    />
                </div>
            )
        },
        cell: ({ row }) => {
            const { extension, type, name } = row.original

            return (
                <div className={'flex flex-row items-center gap-3 [&>svg]:size-4'}>
                    {type === 'FILE' ? <File/> : <Folder/>}
                    <span>{name}{extension}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => {
            const { type } = row.original

            const size = parseFloat(row.getValue('size'))
            const formatted = formatBytes(size)

            const isFile = type === 'FILE'

            return (
                <span>{isFile ? formatted : '-'}</span>
            )
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => {
            return (
                <div className={'flex items-center gap-1'}>
                    <span>Type</span>
                    <Button
                        size={'icon'}
                        icon={<ArrowUpDown/>}
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    />
                </div>
            )
        },
        cell: ({ row }) => {
            const { type } = row.original

            return type === 'FILE' ? 'File' : 'Folder'
        },
    },
    {
        accessorKey: 'owner.name',
        header: 'Owner',
    },
    {
        accessorKey: 'updatedAt',
        header: 'Last modified',
        cell: ({ row }) => {
            const { updatedAt } = row.original

            return dayjs(updatedAt).format('MMM DD, YYYY')
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const fileFolder = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"
                                className="text-right h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[10rem]">
                        <DropdownButtonInfo fileOrFolder={fileFolder}/>
                        <DropdownMenuSeparator/>
                        <DropdownButtonRename fileOrFolder={fileFolder}/>
                        <DropdownButtonDelete fileOrFolderId={[fileFolder.id]}/>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
]
