import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { TooltipProvider } from '@/components/ui/tooltip';

export function RootProviders({ children }: PropsWithChildren) {
    return (
        <TooltipProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NextTopLoader showSpinner={false} shadow={false} height={2}/>
                {children}
                <Toaster richColors/>
            </ThemeProvider>
        </TooltipProvider>
    )
}
