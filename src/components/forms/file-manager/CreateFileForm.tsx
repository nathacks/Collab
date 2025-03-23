'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateFileFormSchema } from '@/schemas/file-manager.schema';
import { onSubmitCreateFileAction } from '@/actions/file-manager/createFile.action';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useFileManagerStore } from '@/stores/files.store';
import { useWorkspace } from '@/context/WorkspaceParams';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { SelectExtension } from '@/components/file-manager/SelectExtension';
import { ChevronsUpDown } from 'lucide-react';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useSearchParams } from 'next/navigation';


const extensions = [
    { label: '.txt', value: '.txt' },
    { label: '.drive', value: '.drive' },
];

export function CreateFileForm() {
    const { addFileFolder, filesFolders } = useFileManagerStore()
    const { workspaceId } = useWorkspace();
    const { closeDialog } = useConfirmationDialogStore();

    const searchParams = useSearchParams()
    const folderId = searchParams.get('folder');

    const boundCreateFileAction = onSubmitCreateFileAction.bind(null, workspaceId, folderId)

    const filesOnly = filesFolders.children.filter((filesFolder) => filesFolder.type === 'FILE')

    const {
        form,
        handleSubmitWithAction,
        action
    } = useHookFormAction(boundCreateFileAction, zodResolver(CreateFileFormSchema(filesOnly)), {
        formProps: {
            defaultValues: {
                name: '',
                extension: extensions[0].value
            }
        },
        actionProps: {
            onSuccess:
                ({ data }) => {
                    if (data) addFileFolder(data)
                    closeDialog()
                }
        }
    })

    return (
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
                                    <Input
                                        {...field}
                                        className={cn('rounded-r-none')}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="extension"
                        render={({ field }) => (
                            <FormItem className={'self-end'}>
                                <SelectExtension value={field.value} extensions={extensions}
                                                 onSelectItem={(extensionValue) => form.setValue('extension', extensionValue)}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    'justify-between rounded-l-none border-l-0',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                {field.value
                                                    ? extensions.find((extension) => extension.value === field.value)?.label
                                                    : '.txt'}
                                                <ChevronsUpDown className="opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                </SelectExtension>
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className={'flex'}>
                    <DialogClose asChild>
                        <Button disabled={action.isPending} variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button loading={action.isPending} type="submit">Create</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
