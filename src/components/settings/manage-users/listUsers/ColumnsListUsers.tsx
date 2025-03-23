'use client'

import { AvatarDisplay } from '@/components/utils/AvatarDisplay';
import { ColumnDef } from '@tanstack/react-table';
import { ButtonRevokeUser } from '@/components/settings/manage-users/listUsers/ButtonRevokeUser';
import { Badge } from '@/components/ui/badge';
import { SelectorRoles } from '@/components/settings/manage-users/listUsers/SelectorRoles';
import { formatStringFirstUpAllLower } from '@/utils/formatStringFirstUpAllLower';
import { WorkspaceUserWithRole } from '@/models/workspace.model';

export const columnsListUsers: ColumnDef<WorkspaceUserWithRole>[] = [
    {
        header: 'Name',
        accessorKey: 'user.name',
        cell: ({ getValue }) => {
            const name = getValue() as string

            return (
                <div className={'flex flex-1 items-center gap-2'}>
                    <AvatarDisplay className={'cursor-default'} seed={name}/>
                    <span>{name}</span>
                </div>
            )
        }
    },
    {
        header: 'Email',
        accessorKey: 'user.email',
    },
    {
        header: 'Role',
        accessorKey: 'role.name',
        cell: ({ row }) => {
            const { id, name } = row.original.role
            const userId = row.original.userId

            const isOwner = name === 'OWNER';

            if (isOwner) {
                return <Badge className={'cursor-default'}>{formatStringFirstUpAllLower(name)}</Badge>
            }

            return <SelectorRoles role={{ id, name }} userId={userId}/>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const userId = row.original.userId;
            const roleId = row.original.roleId;

            return <ButtonRevokeUser userId={userId} roleId={roleId}/>
        },
    }
]
