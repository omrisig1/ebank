/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from "express";
import { IResponseMessage } from "../../types/types.js";
import * as S from "./family.service.js";

// Create family account
export async function createFamilyAccount(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const new_family_account_details = await S.createNewFamilyAccount(req.body);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Family account created",
        data: new_family_account_details,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Get family account by ID - FULL
export async function getFamilyAccountByIdFull(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const family_account_full = await S.getFamilyAccountByIdFull(Number(req.params.id));
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Family account found",
        data: family_account_full,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Get family account by ID - SHORT
export async function getFamilyAccountByIdShort(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const family_account_short = await S.getFamilyAccountByIdShort(Number(req.params.id));
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Family account found",
        data: family_account_short,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Add individuals to family account
export async function addIndividualsToFamily(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const family_account = await S.addIndividualsToFamily(Number(req.params.family_id),req.body);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Individuals added to family account.",
        data: family_account,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Delete individuals from family account
export async function deleteIndividualsFromFamily(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const family_account = await S.deleteIndividualsFromFamily(Number(req.params.family_id),req.body);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Individuals deleted from family account.",
        data: family_account,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Transfer F2B
export async function transferFromFamilyToBusiness(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const results = await S.transferFromFamilyToBusiness(req.body);
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Transfer has done successfully.",
        data: results,
    };
    res.status(outputResponse.status).json(outputResponse);
}

// Close family account by ID
export async function closeFamilyAccountById(req: Request, res: Response): Promise<void> {
    // TODO: add failure senario
    const results = await S.closeFamilyAccountById(Number(req.params.id));
    const outputResponse: IResponseMessage = {
        status: 200,
        message: "Family account has closed successfully.",
        data: results,
    };
    res.status(outputResponse.status).json(outputResponse);
}