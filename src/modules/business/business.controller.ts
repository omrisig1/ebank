/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from "express";
import HttpException from "../../exceptions/http-exception.js";
import { IResponseMessage, ITransfer } from "../../types/types.js";
import { IBusinessAccount } from "./business.model.js";
import * as S from "./business.service.js";

// Create an business account
export async function createBusinessAccount(req: Request, res: Response): Promise<void> {
    const new_business_account = await S.createNewBusinessAccount(req.body as IBusinessAccount);
    if(!new_business_account){
        throw new HttpException(400,"Failed to create a new business account.");
    } else {
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Business account created",
            data: new_business_account,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}

// Get business account by ID
export async function getBusinessAccountById(req: Request, res: Response): Promise<void> {
    const business_account = await S.getBusinessAccountById(Number(req.params.id));
    if(!business_account){
        throw new HttpException(400,`Failed to access business account with id: ${req.params.id}.`);
    } else {
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Business account found",
            data: business_account,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}

// Transfer B2B/B2I (same currency)
export async function transferFromBusinessSameCurrency(req: Request, res: Response): Promise<void> {
    const source_and_destination_accounts = await S.transferSameCurrency(req.body as ITransfer);
    const { source_account: source, destination_account: destination } = req.body as ITransfer;
    if(!source_and_destination_accounts){
        throw new HttpException(400,`Failed to transfer money from ${source} to ${destination}.`);
    } else {
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Transfer has done successfully.",
            data: source_and_destination_accounts,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}

// Transfer B2B (different currency)
export async function transferFromBusinessDifferentCurrency(req: Request, res: Response): Promise<void> {
    const source_and_destination_accounts = await S.transferDifferentCurrency(req.body as ITransfer);
    const { source_account: source, destination_account: destination } = req.body as ITransfer;
    if(!source_and_destination_accounts){
        throw new HttpException(400,`Failed to transfer money from ${source} to ${destination}.`);
    } else {
        if(source_and_destination_accounts.hasOwnProperty('success') && source_and_destination_accounts.success === false){
            throw new HttpException(400,`Failed to transfer money from ${source} to ${destination}. ${source_and_destination_accounts.error.type}`);

        }
        const outputResponse: IResponseMessage = {
            status: 200,
            message: "Transfer has done successfully.",
            data: source_and_destination_accounts,
        };
        res.status(outputResponse.status).json(outputResponse);
    }
}