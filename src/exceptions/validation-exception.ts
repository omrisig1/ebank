export default class validationException extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }
}