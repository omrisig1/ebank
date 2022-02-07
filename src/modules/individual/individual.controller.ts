/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from "express";
import HttpException from "../../exceptions/http-exception.js";
import { IChangeStatus, IResponseMessage } from "../../types/types.js";
import { IIndividualAccount } from "./individual.model.js";
import * as S from "./individual.service.js";

// Create an individual account
export async function createIndividualAccount(req: Request, res: Response): Promise<void> {
    const new_individual_account = await S.createNewIndividualAccount(req.body as IIndividualAccount);
    if(!new_individual_account){
        throw new HttpException(400,"Failed to create a new individual account.");
    } else {
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Individual account created",
            data: new_individual_account,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}

// Get individual account by ID
export async function getIndividualAccountById(req: Request, res: Response): Promise<void> {
    const individual_account = await S.getIndividualAccountById(Number(req.params.id));
    if(!individual_account){
        throw new HttpException(400,`Failed to access individual account with id: ${req.params.id}.`);
    } else {
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Individual account found",
            data: individual_account,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}

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
