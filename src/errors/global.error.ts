export class GlobalError extends Error {
    code?: number;
    status?: number;

    constructor({ code, message, status }: { code?: number; message: string, status?: number }) {
        super();
        this.code = code;
        this.message = message
        this.status = status;
    }
}
