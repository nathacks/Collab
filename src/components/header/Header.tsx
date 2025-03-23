import { SidebarTrigger } from '@/components/ui/sidebar';
import { Account } from '@/components/header/Account';
import { Separator } from '@/components/ui/separator';
import { ToggleTheme } from '@/components/ToggleTheme';
import { SearchBarCommand } from '@/components/header/SearchBar/SearchBarCommand';

export function Header() {
    return (
        <div className={'peer mr-2 ml-2 md:ml-0 h-14 gap-3 flex items-center justify-between bg-base-6'}
             data-variant={'inset'}>
            <SidebarTrigger/>
            <SearchBarCommand/>
            <div className="flex h-5 items-center space-x-4">
                <ToggleTheme/>
                <Separator orientation="vertical"/>
                <Account/>
            </div>
        </div>
    )
}
