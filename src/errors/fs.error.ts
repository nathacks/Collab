export class FileSystemError extends Error {
    code: string;

    constructor({ code = 'unknown', message }: { code?: string; message: string }) {
        super(message);
        this.code = code;
        this.message = message
    }
}

