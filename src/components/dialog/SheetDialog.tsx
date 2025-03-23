'use client'

import { useSheetDialogStore } from '@/stores/sheetDialog.store';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

export function SheetDialog() {
    const { open, title, description, closeSheetDialog, content } = useSheetDialogStore();

    return (
        <Sheet open={open} onOpenChange={closeSheetDialog}>
            <SheetContent>
                <SheetHeader className={'space-y-3'}>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>
                {content}
            </SheetContent>
        </Sheet>
    );
}
