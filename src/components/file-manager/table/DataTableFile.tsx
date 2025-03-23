'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDataTableStore } from '@/stores/dataTable.store.ts';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTableFile<TData, TValue>({
                                                 columns,
                                                 data,
                                             }: DataTableProps<FileWithOwnerAndOmit, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const { rowSelection, setRowSelection } = useDataTableStore()
    const router = useRouter()

    const table = useReactTable({
        data,
        columns,
        getRowId: originalRow => originalRow.id,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: (updaterOrValue) => {
            if (typeof updaterOrValue === 'function') {
                setRowSelection(updaterOrValue(rowSelection))
            } else {
                setRowSelection(updaterOrValue)
            }
        },
        state: {
            sorting,
            rowSelection
        },
    })

    return (
        <ScrollArea disableScrollbar className={'flex flex-1 border-t rounded-b-lg'}>
            <Table>
                <TableHeader className="sticky top-0 bg-secondary">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                onDoubleClick={() => {
                                    const { id: fileFolderId } = row.original
                                    const isFolder = row.original.type === 'FOLDER'

                                    if (isFolder) {
                                        router.push(`./file-manager?folder=${fileFolderId}`)
                                    } else {
                                        router.push(`./file-manager/${fileFolderId}`)
                                    }
                                }}
                                onClick={() => {
                                    const isMultipleSelected = Object.keys(rowSelection).length > 1;
                                    if (isMultipleSelected) {
                                        setRowSelection({ [row.id]: true });
                                        return;
                                    }
                                    setRowSelection(!rowSelection[row.id] ? { [row.id]: true } : {});
                                }}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell onClick={(e) => cell.column.id === 'actions' && e.stopPropagation()}
                                                   key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-full border-0 text-center">
                                No file or folder.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}
