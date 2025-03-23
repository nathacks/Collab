import { File, Folder, Moon, Sun } from 'lucide-react';
import { CreateFileForm } from '@/components/forms/file-manager/CreateFileForm';
import { CreateFolderForm } from '@/components/forms/file-manager/CreateFolderForm';
import { useConfirmationDialogStore } from '@/stores/confirmationDialog.store';
import { useTheme } from 'next-themes';

export function commandItem() {
    const { openDialog } = useConfirmationDialogStore();
    const { setTheme } = useTheme();

    return [
        {
            heading: 'Quick Actions',
            items: [
                {
                    label: 'Create File',
                    icon: <File/>,
                    action: () => {
                        openDialog({
                            title: 'Create a New File',
                            description: 'Enter a file name and select or specify an extension to create a new file.',
                            content: <CreateFileForm/>
                        });
                    }
                },
                {
                    label: 'Create Folder',
                    icon: <Folder/>,
                    action: () => {
                        openDialog({
                            title: 'Create a New Folder',
                            description: 'Enter a folder name.',
                            content: <CreateFolderForm/>
                        });
                    }
                }
            ]
        },
        {
            heading: 'Theme',
            items: [
                {
                    label: 'Light',
                    icon: <Sun/>,
                    action: () => setTheme('light'),
                },
                {
                    label: 'Dark',
                    icon: <Moon/>,
                    action: () => setTheme('dark'),
                },
            ]
        }
    ];
}
