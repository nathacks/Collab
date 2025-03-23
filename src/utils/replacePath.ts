export function replacePath(newName: string, path?: string) {
    return path?.replace(/[^/]+$/, (match) => {
        const lastDotIndex = match.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            return newName + match.substring(lastDotIndex);
        } else {
            return newName;
        }
    });
}
