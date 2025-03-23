export class AiError extends Error {

    constructor({ message }: { message: string }) {
        super();
        this.message = message
    }
}
