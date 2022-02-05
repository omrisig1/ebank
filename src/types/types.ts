export interface IResponseMessage {
    status: number;
    message: string;
    data: any;
}
export interface IErrorResponse {
    status: number;
    message: string;
    stack?: string;
}
