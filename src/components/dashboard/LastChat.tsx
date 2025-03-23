'use client'

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AvatarDisplay } from '@/components/utils/AvatarDisplay';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { ScrollArea } from '../ui/scroll-area';


const messageDefault = [
    { left: true, message: 'Hello, this is a test message.' },
    { right: true, message: 'Sure, I can help you with that!' },
    { left: true, message: 'Let me check that for you.' },
]

export function LastChat() {
    const [messages, setMessages] = useState(messageDefault);

    const form = useForm({
        defaultValues: {
            message: '',
        },
    })

    function onSubmit({ message }: { message: string }) {
        setMessages((prevMessages) => [...prevMessages, { right: true, message }])
        form.reset()
    }

    return (
        <div className={'flex flex-1 p-4 border rounded-lg bg-card text-card-foreground shadow-sm h-72 '}>
            <div className={'flex flex-1 flex-col'}>
                <div className={'flex-1 flex flex-col gap-3'}>
                    <div className={'truncate flex flex-row justify-between items-start pb-2 border-b'}>
                        <div className={'flex gap-2 items-center'}>
                            <AvatarDisplay seed={'Nathan Abitbol'}/>
                            <div className={'flex flex-col'}>
                                <span className={'font-semibold text-base'}>Nathan Abitbol</span>
                                <span className={'text-sm text-muted-foreground'}>n@example.com</span>
                            </div>
                        </div>
                        <div className={'flex flex-col items-end gap-1'}>
                            <Badge className={'truncate'}>Chat : Soon</Badge>
                        </div>
                    </div>
                    <ScrollArea className={cn('h-36', { 'pr-2': messages.length })}>
                        <div className={'flex flex-col flex-1 mb-4 gap-2'}>
                            {messages.map(({ right, message }, index) => (
                                <p key={index}
                                   className={cn('self-start text-sm bg-input rounded-2xl rounded-bl-md px-3 py-2', {
                                       'self-end bg-primary text-primary-foreground rounded-2xl rounded-br-md': right,
                                   })}>
                                    {message}
                                </p>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full gap-2">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className={'flex-1'}>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="resize-none px-3 py-2"
                                            placeholder="Type your message..."
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size={'icon'} className={'w-12'}
                                icon={<Send/>}/>
                    </form>
                </Form>
            </div>
        </div>
    )
}

