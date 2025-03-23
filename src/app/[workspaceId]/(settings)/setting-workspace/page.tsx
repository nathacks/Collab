import { Separator } from '@/components/ui/separator';
import { RenameWorkspaceForm } from '@/components/forms/workspace/RenameWorkspaceForm';
import { DeleteWorkspace } from '@/components/forms/workspace/DeleteWorkspace';

export default function WorkspaceSettingPage() {
    return (
        <div className={'flex flex-1 flex-col gap-3 px-7 pt-7 pb-4'}>
            <div className={'flex flex-col gap-2'}>
                <h1 className={'text-2xl font-semibold'}>Settings Workspace</h1>
                <span className={'text-secondary-foreground text-sm'}>Manage your Workspace settings.</span>
            </div>
            <Separator/>
            <div className={'flex flex-1 gap-12'}>
                <RenameWorkspaceForm/>
            </div>
            <DeleteWorkspace/>
        </div>
    )
}
