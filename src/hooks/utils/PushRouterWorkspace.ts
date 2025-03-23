import { usePathname, useRouter } from 'next/navigation';

export function usePushRouterWorkspace() {
    const router = useRouter();
    const pathname = usePathname();

    return (workspaceId: string) => {
        const newPath = pathname.replace(/^\/[^/]+/, `/${workspaceId}`);
        router.push(newPath);
    }
}
