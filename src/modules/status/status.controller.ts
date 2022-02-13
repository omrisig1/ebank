/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from "express";
import HttpException from "../../exceptions/http-exception.js";
import { IChangeStatus, IResponseMessage } from "../../types/types.js";
import * as S from "./status.service.js";


// Activate/Deactivate accounts
export async function changeAccountStatus(req: Request, res: Response): Promise<void> {
    const accounts_statuses = await S.changeAccountStatus(req.body as IChangeStatus);
    if(!accounts_statuses){
        throw new HttpException(400,"Failed to change accounts statuses.");
    } else {
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Account's statuses changed.",
            data: accounts_statuses,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}