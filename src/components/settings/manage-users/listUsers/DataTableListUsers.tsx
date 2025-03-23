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
import { columnsListUsers } from '@/components/settings/manage-users/listUsers/ColumnsListUsers';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth-client';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export function DataTableListUsers<TData, TValue>({
                                                      columns,
                                                      data,
                                                  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const { isPending } = authClient.useSession()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
    });

    return (
        <ScrollArea disableScrollbar className="flex flex-[2] border rounded-md">
            <Table>
                <TableHeader className="sticky top-0 bg-secondary">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        onClick={(e) =>
                                            cell.column.id === 'actions' && e.stopPropagation()
                                        }
                                        key={cell.id}
                                    >
                                        {isPending ? <Skeleton
                                            className="h-9 rounded-md"/> : flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columnsListUsers.length} className="h-full border-0 text-center">
                                No users.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </ScrollArea>
    )
        ;
}

