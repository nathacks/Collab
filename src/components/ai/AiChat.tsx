'use client'

import { BotMessageSquare, File, Folder, LoaderCircle, Plus, Send, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { useWorkspace } from '@/context/WorkspaceParams';
import { AiMessages } from '@/components/ai/AiMessages';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { useKeyPressed } from '@/hooks/utils/keyPressed';
import { useSearchParams } from 'next/navigation';

export function AiChat() {
    const { workspaceId } = useWorkspace();
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams()
    const folderId = searchParams.get('folder');

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setInput,
        status,
        error,
        stop,
        setMessages,
    } = useChat({
        api: `/api/ai/${workspaceId}`,
        body: {
            parentId: folderId
        }
    });

    const isSubmitted = status === 'submitted';
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }, [open, messages, error]);

    useKeyPressed((e) => e.key === 'i' && (e.metaKey || e.ctrlKey), () => setOpen(prev => !prev));

    const onNewChat = () => {
        setMessages([])
        stop()
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    className="absolute right-0 bottom-0 m-4 [&_svg]:size-5 rounded-xl p-6 shadow text-primary-foreground bg-primary"
                >
                    <BotMessageSquare/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={'flex flex-col mr-4 min-w-[400px] gap-4'}>
                <div className={'flex flex-1 flex-col gap-4'}>
                    <div className={'flex flex-col gap-2'}>
                        <div className={'flex gap-3'}>
                            <div className={'flex flex-1 items-center '}>
                                <div className={'flex flex-1 gap-3 items-center'}>
                                    <b>Collab AI</b>
                                    <Button variant={'secondary'} disabled={!messages.length}
                                            className={'h-7 pr-2 pl-1 gap-1'} icon={<Plus/>}
                                            onClick={onNewChat}>New Chat</Button>
                                </div>
                                <kbd
                                    className="pointer-events-none md:inline-flex hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className="text-xs">⌘</span>
                                    I
                                </kbd>
                            </div>
                            <Button onClick={() => setOpen(false)} size={'icon'} className={'size-7'}
                                    variant={'ghost'}
                                    icon={<X/>}/>
                        </div>
                        <Separator className={'w-[calc(100%-2.5rem)]'}/>
                    </div>
                    <ScrollArea className={cn('h-80', { 'pr-3': messages.length })}>
                        <div className={'flex flex-col pb-3 text-sm gap-5 h-full'}>
                            {messages.length ? messages.map((message) => (
                                <AiMessages key={message.id} message={message} onClose={() => setOpen(false)}
                                            mode={'chat'}
                                            className={cn('self-start bg-muted rounded-2xl rounded-br-md px-4 py-2', {
                                                'self-end bg-primary text-primary-foreground': message.role === 'user',
                                            })}/>
                            )) : (
                                <div
                                    className={'flex flex-col flex-1 mb-16 gap-3 justify-center items-center'}>
                                    <div className={'flex flex-col w-4/6 items-center gap-2'}>
                                        <b>How can I help you?</b>
                                        <Separator/>
                                    </div>
                                    <div
                                        className={'grid grid-cols-2 w-full gap-3'}>
                                        <Button onClick={() => setInput('Create me a File: test.txt')}
                                                variant={'outline'} className={'h-14 flex'} icon={<File/>}>Create me a
                                            File</Button>
                                        <Button onClick={() => setInput('Create me a Folder : test')}
                                                variant={'outline'} className={'h-14 flex'} icon={<Folder/>}>Create me a
                                            Folder</Button>
                                    </div>
                                </div>
                            )}
                            {isSubmitted ? (
                                <div className={'self-start bg-muted rounded-2xl rounded-br-md px-4 py-2'}>
                                    <LoaderCircle className={'animate-spin'}/>
                                </div>
                            ) : null}
                            {error ? <span className={'self-center'}>{error.message}</span> : null}
                        </div>
                        <div about={'scroll'} ref={messagesEndRef}/>
                    </ScrollArea>
                </div>
                <form onSubmit={handleSubmit} className={'flex gap-2 items-end'}>
                    <Textarea
                        rows={1}
                        className="resize-none min-h-10 max-h-28 px-3 py-2"
                        autoFocus
                        value={input}
                        onChange={handleInputChange}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${Math.min(target.scrollHeight, 112)}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                input.trim() !== '' && handleSubmit(e);
                            }
                        }}
                        placeholder="Type your message..."
                    />
                    <Button disabled={isSubmitted || input.trim() === ''} type="submit" size={'icon'} className={'w-12'}
                            icon={<Send/>}/>
                </form>
            </PopoverContent>
        </Popover>
    );
}
