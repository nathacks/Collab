import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceParams';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ItemSelectWorkspace } from '@/components/sidebar/app/workspace/ItemSelectWorkspace';

export function OtherWorkspace() {
    const { workspaceId, workspaces } = useWorkspace();
    const [{ isSearch, searchInput }, setSearchWorkspace] = useState({ isSearch: false, searchInput: '' })

    const filterWorkspace = workspaces.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()));

    const haveOtherWorkspaces = workspaces.some((workspace) => workspace.id !== workspaceId)

    if (!haveOtherWorkspaces) return null;

    return (
        <>
            <div className={'flex items-center mt-1 px-2 my-2 h-7 text-secondary-foreground'}>
                {!isSearch ? (
                    <div className={'flex flex-1 items-center'}>
                        <span className={'flex-1 text-xs'}>Change workspace</span>
                        <Button onClick={() => setSearchWorkspace((prev) => ({ ...prev, isSearch: true }))}
                                icon={<Search/>}
                                className={'p-1 h-auto'} variant={'ghost'}/>
                    </div>
                ) : (
                    <div className={'flex flex-1 relative'}>
                        <div className="absolute ">
                            <Search className={'p-1 mt-0.5 ml-0.5'}/>
                        </div>
                        <Input placeholder={'Search workspace...'}
                               onChange={(event) => {
                                   event.preventDefault()
                                   event.stopPropagation()
                                   setSearchWorkspace(prev => ({
                                       ...prev,
                                       searchInput: event.target.value
                                   }))
                               }}
                               className={'!text-xs h-7 pl-7 pr-6'}>
                        </Input>
                        <Button
                            onClick={() => setSearchWorkspace({ searchInput: '', isSearch: false })}
                            icon={<X/>}
                            className={'p-1 mt-0.5 mr-0.5 h-auto top-0 right-0 absolute'}
                            variant={'ghost'}/>
                    </div>
                )}
            </div>
            <ScrollArea className="h-40">
                {filterWorkspace.map((workspace, index) => {
                    if (workspace.id !== workspaceId) {
                        return (
                            <ItemSelectWorkspace key={index} workspace={workspace}/>
                        )
                    }
                })}
            </ScrollArea>
        </>
    )
}
