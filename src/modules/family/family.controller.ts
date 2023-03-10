/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Util from "../utils.dal.js";
import { Request, Response } from "express";
import HttpException from "../../exceptions/http-exception.js";
import { IAddIndividualsToFamily, ICreateFamilyAccount, IRemoveIndividualsToFamily, IResponseMessage, ITransfer } from "../../types/types.js";
import  S from "./family.service.js";

class FamilyController {
    // Create family account
     async  createFamilyAccount(req: Request, res: Response): Promise<void> {
        const new_family_account_details = await S.createNewFamilyAccount(req.body as ICreateFamilyAccount);
        if(!new_family_account_details){
            throw new HttpException(400,"Failed to create a new family account.");
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Family account created",
                data: new_family_account_details,
            };
            await Util.saveIdempotency(req, outputResponse);
            res.status(outputResponse.status).json(outputResponse);
        }
    }



    // // Get family account by ID - FULL/SHORT
     async  getFamilyAccountById(req: Request, res: Response): Promise<void> {
        const family_account = await S.getFamilyAccountById(Number(req.params.id),req.params.details_level);
        if(!family_account){
            throw new HttpException(400,`Failed to access family account with id: ${req.params.id}.`);
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Family account found",
                data: family_account,
            };
            res.status(outputResponse.status).json(outputResponse);
        }
    }

    // Add individuals to family account - return FULL/SHORT
     async  addIndividualsToFamily(req: Request, res: Response): Promise<void> {
        const family_account = await S.addIndividualsToFamily(Number(req.params.family_id), req.params.details_level, req.body as IAddIndividualsToFamily);
        if(!family_account){
            throw new HttpException(400,`Failed to add individuals to family account with id: ${req.params.family_id}.`);
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Individuals added to family account.",
                data: family_account,
            };
            res.status(outputResponse.status).json(outputResponse);
        }
    }

    // Delete individuals from family account - return FULL/SHORT
     async  deleteIndividualsFromFamily(req: Request, res: Response): Promise<void> {
        const family_account = await S.deleteIndividualsFromFamily(Number(req.params.family_id), req.params.details_level, req.body as IRemoveIndividualsToFamily);
        if(!family_account){
            throw new HttpException(400,`Failed to remove individuals from family account with id: ${req.params.family_id}.`);
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Individuals deleted from family account.",
                data: family_account,
            };
            res.status(outputResponse.status).json(outputResponse);
        }
    }

    // Transfer F2B
     async  transferFromFamilyToBusiness(req: Request, res: Response): Promise<void> {
        const source_and_destination_accounts = await S.transferFromFamilyToBusiness(req.body as ITransfer);
        const { source_account, destination_account } = req.body as ITransfer;
        if(!source_and_destination_accounts || source_and_destination_accounts.length === 0){
            throw new HttpException(400,`Failed to transfer money from ${source_account} to ${destination_account}.`);
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Transfer has done successfully.",
                data: source_and_destination_accounts,
            };
            res.status(outputResponse.status).json(outputResponse);
        }
    }

    // Close family account by ID
     async  closeFamilyAccountById(req: Request, res: Response): Promise<void> {
        const results = await S.closeFamilyAccountById(Number(req.params.id));
        if(!results){
            throw new HttpException(400,`Failed to close family account with id: ${req.params.id}`);
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Family account has closed successfully.",
                data: results,
            };
            res.status(outputResponse.status).json(outputResponse);
        }
    }
}

const C = new FamilyController();
export default C;