/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from "express";
import HttpException from "../../exceptions/http-exception.js";
import { IResponseMessage, ITransfer } from "../../types/types.js";
import { IIndividualAccount } from "./individual.model.js";
import S from "./individual.service.js";
import Util from "../utils.dal.js";

class IndividualController {
        // Create an individual account
    createIndividualAccount = async (req: Request, res: Response):Promise<void> => {
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
     async  getIndividualAccountByAccountId(req: Request, res: Response): Promise<void> {
        const individual_account = await S.getIndividualAccountByAccountId(Number(req.params.id));
        if(!individual_account){
            throw new HttpException(400,`Failed to access individual account with id: ${req.params.id}.`);
        } else {
            const outputResponse: IResponseMessage = {
                status: 200,
                message: "Individual account found",
                data: individual_account,
            };
            await Util.saveIdempotency(req, outputResponse);
            res.status(outputResponse.status).json(outputResponse);
        }
    }


     async  transferFromOwnerToFamily(req: Request, res: Response): Promise<void> {
        const source_and_destination_accounts = await S.transferFromIndividualToFamily(req.body as ITransfer);

        const { source_account, destination_account } = req.body as ITransfer;
        if(!source_and_destination_accounts || (Array.isArray(source_and_destination_accounts) && source_and_destination_accounts.length === 0)){
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
}

const C = new IndividualController();
export default C;