import useSWRMutation from 'swr/mutation';
import { FileInfoWithWorkspaceParentOmit } from '@/models/file-manager.model';

async function getRequest(url: string, { arg, signal }: {
    arg: string; signal?: AbortSignal
}): Promise<FileInfoWithWorkspaceParentOmit[]> {
    return fetch(`${url}?nameFileOrFolder=${arg}`, {
        method: 'GET',
        signal,
    }).then(res => res.json());
}

export function useGetFileFolderByInput() {
    return useSWRMutation(`/api/searchFileFolder`, getRequest);
}
