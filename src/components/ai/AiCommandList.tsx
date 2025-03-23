'use client'

import * as React from 'react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useSearchParams } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { useWorkspace } from '@/context/WorkspaceParams';
import { CircleX, File, Folder, LoaderCircle, Search, Send, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useKeyPressed } from '@/hooks/utils/keyPressed';
import { AiMessages } from '@/components/ai/AiMessages';
import { Separator } from '@/components/ui/separator';


interface AiCommandListProps {
    setAiMode: Dispatch<SetStateAction<boolean>>;
    openCloseDialog: () => void;
}

export function AiCommandList({ setAiMode, openCloseDialog }: AiCommandListProps) {
    const { workspaceId } = useWorkspace();

    const searchParams = useSearchParams();
    const folderId = searchParams.get('folder');

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setInput,
        setMessages,
        stop,
        error,
        status,
    } = useChat({
        api: `/api/ai/${workspaceId}`,
        body: {
            parentId: folderId,
        },
    });
    const reponseMessage = messages.slice(1)

    const isReady = status === 'ready';
    const hasResponse = reponseMessage.length > 0;
    const isTyping = input.trim() !== '';

    useKeyPressed((e) => e.key === 'Backspace' && input === '', () => setAiMode(false));

    const handleCancelAI = () => {
        stop()
        setMessages([])
    }

    return (
        <>
            <div className="flex flex-1 items-center px-3 border-b gap-3">
                <div className="flex flex-1 items-center gap-2">
                    <Search className="h-4 w-4 shrink-0 opacity-50"/>
                    <Badge className="shadow-[0_1px_10px] shadow-primary pointer-events-none">Collab AI</Badge>
                    <CommandInput
                        className="flex-1"
                        showIcon={false}
                        autoFocus
                        classNameParent={'border-0 px-0'}
                        value={input}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        placeholder={error ? error.message : 'Type your message...'}
                    />
                </div>
                {!isReady ? (
                    <div className={'size-6 group text-muted-foreground'}>
                        <LoaderCircle className={'animate-spin group-hover:hidden'}/>
                        <X onClick={handleCancelAI} className="cursor-pointer invisible group-hover:visible"/>
                    </div>
                ) : (
                    input.trim() !== '' && (
                        <div className="flex items-center gap-2">
                            <kbd
                                className="pointer-events-none md:inline-flex hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">{'Enter ↵'}</span>
                            </kbd>
                        </div>
                    )
                )}
            </div>
            <CommandList>
                {hasResponse && (
                    <>
                        <CommandGroup heading="Last Response">
                            {reponseMessage.map((message) => (
                                <AiMessages key={message.id} message={message} onClose={openCloseDialog}
                                            mode="command"/>
                            ))}
                        </CommandGroup>
                        <Separator/>
                    </>
                )}
                {!isReady && (
                    <CommandItem onSelect={handleCancelAI} className={'m-2'}>
                        <CircleX className={'size-5'}/> Cancel Request
                    </CommandItem>
                )}
                {isReady && (
                    <>
                        {isTyping && (
                            <CommandItem onSelect={() => {
                                setMessages([])
                                handleSubmit()
                            }} className={'mx-2 mt-2'}>
                                <Send/> {input}
                            </CommandItem>
                        )}
                        <CommandGroup heading={'Shortcut'}>
                            <CommandItem onSelect={() => setInput('Create File : test.txt')}>
                                <File/> Create File
                            </CommandItem>
                            <CommandItem onSelect={() => setInput('Create Folder : test')}>
                                <Folder/> Create Folder
                            </CommandItem>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </>
    );
}

