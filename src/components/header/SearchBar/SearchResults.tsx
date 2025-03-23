import { FileInfoWithWorkspaceParentOmit } from '@/models/file-manager.model';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ChevronRight, Ellipsis, File, Folder, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { commandItem } from '@/components/header/SearchBar/commandItem';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetFileFolderByInput } from '@/hooks/api/getFileFolderByInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResultsProps {
    openCloseDialog: () => void;
    setAiMode: Dispatch<SetStateAction<boolean>>;
}

export function SearchResults({ openCloseDialog, setAiMode }: SearchResultsProps) {
    const searchBarItem = commandItem();
    const router = useRouter();

    const [commandInput, setCommandInput] = useState('');
    const debouncedInput = useDebounce(commandInput, 400);

    const { trigger, data, isMutating: isLoading, reset } = useGetFileFolderByInput();

    useEffect(() => {
        if (debouncedInput.trim() !== '') {
            trigger(debouncedInput);
        }
    }, [debouncedInput]);

    const onSelectSearchFileFolder = ({ type, id, workspaceId }: FileInfoWithWorkspaceParentOmit) => {
        if (type === 'FOLDER') {
            router.push(`/${workspaceId}/file-manager?folder=${id}`);
        } else {
            router.push(`/${workspaceId}/file-manager/${id}`);
        }
    };

    const filterCommandOptions = searchBarItem
        .map((group) => ({
            ...group,
            items: group.items.filter((item) =>
                item.label.toLowerCase().includes(commandInput.toLowerCase())
            )
        }))
        .filter((group) => group.items.length > 0);

    return (
        <>

            <div className="flex flex-1 items-center pl-3 pr-1 border-b gap-3">
                <div className="flex flex-1 items-center">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50"/>
                    <CommandInput
                        className="flex-1"
                        showIcon={false}
                        autoFocus={true}
                        classNameParent="border-0 px-0"
                        value={commandInput}
                        onValueChange={setCommandInput}
                        placeholder={'Type a search or command...'}
                    />
                </div>
                <Button onClick={() => setAiMode(true)} variant={'ghost'}
                        className="text-muted-foreground flex pr-3 items-center gap-2">
                    <span className="text-sm font-medium">Ask Collab AI</span>
                    <kbd
                        className="pointer-events-none md:inline-flex hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">{'Tab'}</span>
                    </kbd>
                </Button>
            </div>
            <CommandList>
                {!isLoading ? <CommandEmpty>{'No results found.'}</CommandEmpty> : null}
                {isLoading || data?.length ? (
                    <CommandGroup heading="Search Results">
                        {isLoading ? (
                            <Skeleton className={'w-full h-11'}/>
                        ) : (
                            data?.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    className="cursor-pointer group "
                                    onSelect={() => {
                                        openCloseDialog()
                                        onSelectSearchFileFolder(item)
                                    }}
                                >
                                    <div className="flex w-full items-center justify-between gap-2">
                                    <span className="flex gap-2 items-center min-w-0">
                                        {item.type === 'FILE' ? <File/> : <Folder/>}
                                        <span
                                            className="flex-1 truncate">{item.name}{item.extension ? item.extension : ''}</span>
                                    </span>
                                        <Badge
                                            variant="secondary"
                                            className="text-xs h-4 px-1 m-0 flex items-center pointer-events-none"
                                        >
                                            {item.parent ? (
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <span className="truncate">{item.workspace.name}</span>
                                                    <ChevronRight className="!size-4 shrink-0"/>
                                                    <Ellipsis className="!size-4 shrink-0"/>
                                                    <ChevronRight className="!size-4 shrink-0"/>
                                                    <span className="truncate">{item.parent.name}</span>
                                                </div>
                                            ) : (
                                                <span className="truncate">{item.workspace.name}</span>
                                            )}
                                        </Badge>
                                    </div>
                                </CommandItem>
                            ))
                        )}

                    </CommandGroup>
                ) : null}
                {filterCommandOptions.map((group, index) => (
                    <div key={index}>
                        <CommandGroup heading={group.heading}>
                            {group.items.map((item, itemIndex) => (
                                <CommandItem
                                    key={itemIndex}
                                    className="cursor-pointer"
                                    onSelect={() => {
                                        item.action();
                                        openCloseDialog()
                                    }}
                                >
                                    {item.icon} {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        {index !== filterCommandOptions.length - 1 && <Separator/>}
                    </div>
                ))}
            </CommandList>
        </>
    )
        ;
}
