'use client'

import { CommandDialog } from '../../ui/command';
import { Button } from '../../ui/button';
import * as React from 'react';
import { useState } from 'react';
import { SearchResults } from './SearchResults';
import { useKeyPressed } from '@/hooks/utils/keyPressed';
import { AiCommandList } from '@/components/ai/AiCommandList';

export function SearchBarCommand() {
    const [open, setOpen] = useState(false);
    const [aiMode, setAiMode] = useState(false);

    const openCloseDialog = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
        setAiMode(false);
    };

    useKeyPressed((e) => e.key === 'j' && (e.metaKey || e.ctrlKey), openCloseDialog);
    useKeyPressed((e) => e.key === 'Tab', () => {
        if (open) setAiMode((prev) => !prev);
    });

    return (
        <>
            <Button
                variant="outline"
                onClick={openCloseDialog}
                className="text-sm font-normal !pr-2 hover:bg-muted justify-between hover:text-foreground text-muted-foreground shadow-none flex flex-1 h-8 md:flex-none md:w-1/3"
            >
                <span>Search...</span>
                <kbd
                    className="pointer-events-none md:inline-flex hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </Button>
            <CommandDialog shouldFilter={false} hideCloseButton open={open} onOpenChange={openCloseDialog}>
                {aiMode ? (
                    <AiCommandList setAiMode={setAiMode} openCloseDialog={openCloseDialog}/>
                ) : (
                    <SearchResults
                        setAiMode={setAiMode}
                        openCloseDialog={openCloseDialog}
                    />
                )}
            </CommandDialog>
        </>
    );
}
