import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check } from 'lucide-react';
import { PropsWithChildren } from 'react';


interface SelectExtensionProps {
    value?: string
    onSelectItem: (value: string) => void
    extensions: { label: string; value: string }[]
}

export function SelectExtension({
                                    value,
                                    onSelectItem,
                                    extensions,
                                    children
                                }: PropsWithChildren<SelectExtensionProps>) {
    return (
        <Popover>
            {children}
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search extension..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No extension found.</CommandEmpty>
                        <CommandGroup className={'w-full'}>
                            {extensions.map((extension) => (
                                <PopoverClose key={extension.value} className={'w-full'}>
                                    <CommandItem
                                        value={extension.label}
                                        onSelect={() => {
                                            onSelectItem(extension.value);
                                        }}
                                    >
                                        {extension.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                extension.value === value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                </PopoverClose>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
