import { FC } from 'react';
import { ToolInvocation } from '@ai-sdk/ui-utils';
import { CreateFileFolderChat } from '@/components/ai/tools/CreateFileFolderChat';
import { CreateFileFolderCommand } from '@/components/ai/tools/CreateFileFolderCommand';

export type Tools = 'chat' | 'command';

type ToolComponentMap = Record<string, Record<Tools, FC<{
    toolInvocation: ToolInvocation; onClose: () => void
}>>>

export const toolComponents: ToolComponentMap = {
    createFile: {
        chat: CreateFileFolderChat,
        command: CreateFileFolderCommand
    },
    createFolder: {
        chat: CreateFileFolderChat,
        command: CreateFileFolderCommand
    },
};
