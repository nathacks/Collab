'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge';
import { SelectorRoles } from '@/components/settings/manage-users/listUsers/SelectorRoles';
import { ButtonRemoveInvitedUser } from '@/components/settings/manage-users/listInviteUsers/ButtonRemoveInvitedUser';
import { AvatarDisplay } from '@/components/utils/AvatarDisplay';
import { WorkspaceInvitedUserWithRole } from '@/models/invite.model';

export const columnsListInviteUsers: ColumnDef<WorkspaceInvitedUserWithRole>[] = [
    {
        header: 'Email',
        accessorKey: 'email',
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
        header: 'Status',
        cell: () => (
            <Badge>pending</Badge>
        )
    },
    {
        header: 'Role',
        accessorKey: 'role.name',
        cell: ({ row }) => {
            const role = row.original.role
            const email = row.original.email

            return <SelectorRoles role={role} email={email}/>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const email = row.original.email;
            return <ButtonRemoveInvitedUser email={email}/>
        },
    }
]
