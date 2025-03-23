import { PropsWithChildren } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AlertConfirmationDialog } from '@/components/dialog/AlertConfirmationDialog';
import { ConfirmationDialog } from '@/components/dialog/ConfirmationDialog';
import { SheetDialog } from '@/components/dialog/SheetDialog';

export function WorkspaceProviders({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            {children}
            <AlertConfirmationDialog/>
            <ConfirmationDialog/>
            <SheetDialog/>
        </SidebarProvider>
    )
}
