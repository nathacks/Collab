import { formatStringFirstUpAllLower } from '@/utils/formatStringFirstUpAllLower';
import { useGetAllRolesInWorkspace } from '@/hooks/api/getAllRolesInWorkspace';
import { SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useWorkspace } from '@/context/WorkspaceParams';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { onSubmitUpdateRoleUserWorkspaceAction } from '@/actions/workspace/updateRoleUserWorkspace.action';

interface SelectorRolesProps {
    role: {
        name: string
        id: number
    },
    userId?: string
    email?: string
}

export function SelectorRoles({ role, userId, email }: SelectorRolesProps) {
    const roles = useGetAllRolesInWorkspace()
    const { workspaceId, roleInWorkspace } = useWorkspace();

    const boundDeleteFileFolder = onSubmitUpdateRoleUserWorkspaceAction.bind(null, workspaceId)

    const { executeAsync } = useAction(boundDeleteFileFolder);


    const onValueChange = async (value: string) => {
        const result = await executeAsync({ roleId: parseInt(value, 10), userId, email })

        if (result?.validationErrors?._errors) {
            toast.error(result.validationErrors?._errors);
        }

        if (result?.data) {
            toast.success('Your data has been successfully deleted.')
        }
    }

    const isRoleRejected = roleInWorkspace.id <= role.id

    if (isRoleRejected) {
        return (
            <Badge variant="outline" className="py-1 cursor-default">
                {formatStringFirstUpAllLower(role.name)}
            </Badge>
        )
    }

    return (
        <Select
            value={`${role.id}`}
            onValueChange={onValueChange}
        >
            <SelectTrigger asChild>
                <Badge variant="outline" className="cursor-pointer py-1">
                    {formatStringFirstUpAllLower(role.name)}
                    <ChevronDown className="size-4 mx-0.5"/>
                </Badge>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {roles?.map((role) => (
                            <SelectItem key={role.id}
                                        value={`${role.id}`}>{formatStringFirstUpAllLower(role.name)}</SelectItem>
                        )
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
