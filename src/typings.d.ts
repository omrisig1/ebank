export declare global {

  namespace Express {
    interface Request {
        requestID: string;
        userID: string;
        userRoles: string;
    }
  }
}
