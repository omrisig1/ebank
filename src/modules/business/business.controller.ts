/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from "express";
import { IResponseMessage } from "../../types/types.js";
import { IBusinessAccount } from "./business.model.js";
import * as S from "./business.service.js";

// Create an business account
export async function createBusinessAccount(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const new_business_account = await S.createNewBusinessAccount(req.body as IBusinessAccount);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Business account created",
        data: new_business_account,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Get business account by ID
export async function getBusinessAccountById(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const business_account = await S.getBusinessAccountById(Number(req.params.id));
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Business account found",
        data: business_account,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Transfer B2B/B2I (same currency)
export async function transferFromBusinessSameCurrency(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const results = await S.transferSameCurrency(req.body);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Transfer has done successfully.",
        data: results,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Transfer B2B/B2I (different currency)
export async function transferFromBusinessDifferentCurrency(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const results = await S.transferDifferentCurrency(req.body);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Transfer has done successfully.",
        data: results,
    };
    res.status(outputResponse.status).json(outputResponse);
}