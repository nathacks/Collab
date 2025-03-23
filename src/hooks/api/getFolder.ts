import { toast } from 'sonner';
import { useFileManagerStore } from '@/stores/files.store';

export function useGetFolder() {
    const setFileManager = useFileManagerStore(state => state.setFilesFolders);

    return async (workspaceId: string, folderId: string | null) => {
        const url = `/api/file-manager/${workspaceId}${folderId ? `?folderId=${folderId}` : ''}`;
        const res = await fetch(url);

        if (!res.ok) {
            toast.error('Error getting workspace folder');
            return;
        }

        const data = await res.json();
        setFileManager(data);
    }
}
