'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export function ToggleTheme(props: HTMLAttributes<HTMLButtonElement>) {
    const { setTheme, theme } = useTheme()

    return (
        <Button {...props} variant="ghost" className={cn('size-8', props.className)}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                size="icon">
            <Sun className="size-[1.2rem] scale-0 dark:scale-100"/>
            <Moon className="absolute size-[1.2rem] scale-100 dark:scale-0"/>
        </Button>
    )
}
