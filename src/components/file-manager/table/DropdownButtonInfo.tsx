import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Info } from 'lucide-react';
import { FileWithOwnerAndOmit } from '@/models/file-manager.model';
import * as React from 'react';
import { RefAttributes } from 'react';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { useSheetDialogStore } from '@/stores/sheetDialog.store';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { onSubmitInfoFileFolderAction } from '@/actions/file-manager/InfoFileFolder.action';
import { InfoFileFolderFormSchema } from '@/schemas/file-manager.schema';
import { useFileManagerStore } from '@/stores/files.store';
import { useWorkspace } from '@/context/WorkspaceParams';

type DropdownButtonProps = DropdownMenuItemProps & RefAttributes<HTMLDivElement>

interface DropdownButtonDeleteProps {
    fileOrFolder: FileWithOwnerAndOmit
}

export function DropdownButtonInfo(props: DropdownButtonProps & DropdownButtonDeleteProps) {
    const { fileOrFolder, ...rest } = props;
    const { openSheetDialog } = useSheetDialogStore()
    const { filesFolders } = useFileManagerStore()
    const { workspaceId } = useWorkspace()

    const boundInfoFileFolderAction = onSubmitInfoFileFolderAction.bind(null, workspaceId)

    const {
        form,
        handleSubmitWithAction
    } = useHookFormAction(boundInfoFileFolderAction, zodResolver(InfoFileFolderFormSchema(filesFolders.children)), {
        formProps: {
            defaultValues: {
                name: '',
            }
        },
    });

    const infoContent = (
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className={'flex flex-col gap-5'}>
                <div className={'flex flex-row'}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className={'flex-1 z-10'}>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className={'self-end'}
                        type="submit">Save changes</Button>
            </form>
        </Form>
    )

    return (
        <DropdownMenuItem {...rest} onClick={() => {
            openSheetDialog({
                title: (
                    <div className={'flex items-center gap-2'}>
                        <Info/>Information
                    </div>
                ),
                description: 'View detailed information about this file or folder.',
                content: infoContent,
            })
        }}>
            <Info/>Info
        </DropdownMenuItem>
    )
}
