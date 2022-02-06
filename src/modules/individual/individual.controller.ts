import { Request, Response } from "express";
import { IResponseMessage } from "../../types/types.js";
import { IIndividualAccount } from "./individual.model.js";
import * as S from "./individual.service.js";

// Create an individual account
export async function createIndividualAccount(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const new_individual_account = await S.createNewIndividualAccount(req.body as IIndividualAccount);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Individual account created",
        data: new_individual_account,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Get individual account by ID
export async function getIndividualAccountById(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const individual_account = await S.getIndividualAccountById(Number(req.params.id));
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Individual account found",
        data: individual_account,
    };
    res.status(outputResponse.status).json(outputResponse);
}
