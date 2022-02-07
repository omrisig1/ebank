import HttpException from "./http-exception.js";

export default class unauthorizedException extends HttpException {
    constructor(messege: string) {
        super(401, messege);
    }
}
