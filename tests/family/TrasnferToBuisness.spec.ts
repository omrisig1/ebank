/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
// import buisness_service from "../../src/modules/business/business.service";
import buisness_dal from "../../src/modules/business/business.dal";
// import individual_dal from "../../src/modules/individual/individual.dal.js";
import family_service from "../../src/modules/family/family.service.js";
import family_dal from "../../src/modules/family/family.dal.js";
import sinon from "sinon";
import { IFamilyAccount } from "../../src/modules/family/family.model.js";
import { get_family_full_return } from "./family.mocks.js";
import util from "../../src/modules/utils.dal";
import Validator from "../../src/validations/validator.js";
import { ITransfer } from "../../src/types/types.js";
import { IBusinessAccount } from "../../src/modules/business/business.model.js";
// import {  create_buisness_dal_input,create_buisness_dal_input_no_balance,create_buisness_dal_input_with_status_id,create_buisness_dal_obj_balance_0,create_buisness_return_dal_obj, create_buisness_dal_input_with_black_list}  from "./buisness.mocks.js";
// import { get_individual_dal_obj_return}  from "../individual/individual.mocks.js";
// import { IIndividualAccount } from "../../src/modules/individual/individual.model.js";
import { create_buisness_return_dal_obj } from "../buisness/buisness.mocks.js";

const transfer1 : ITransfer  = {
    source_account: "1234567",
    destination_account: "1234568",
    amount: "100"
}

describe('The Family Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });
    context(`#transfer money properly F to B`,()=> {
        it(`should exist`,()=> {
            expect(family_service.transferFromFamilyToBusiness).to.be.a('function')
        })
        it(`should be true`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').onFirstCall().resolves(create_buisness_return_dal_obj as IBusinessAccount).onSecondCall().resolves(undefined);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return as IFamilyAccount);
            sinon.stub(Validator, 'NumberLessThan').returns(true);
            sinon.stub(util, 'multiTransfer').resolves([create_buisness_return_dal_obj,get_family_full_return]);
            let result = await family_service.transferFromFamilyToBusiness(transfer1);
            expect(result[0].balance).to.equal(10300);

        })
    })
})

const transfer2 : ITransfer  = {
    source_account: "4",
    destination_account: "5",
    amount: "300000"
}
const error_obj : Error  = {
    name: "something",
    message: "300000 should be less than to 10000"
}
describe('The Buisness Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });
    context(`#transfer money  F to B amount exceeded source acc balance `,()=> {
        it(`should exist`,()=> {
            expect(family_service.transferFromFamilyToBusiness).to.be.a('function')
        })
        it(`should throw amount exceeds!!!`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').onFirstCall().resolves(create_buisness_return_dal_obj as IBusinessAccount);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return as IFamilyAccount);
            // sinon.stub(Validator, 'NumberLessThan').returns(true);
            sinon.stub(Validator, 'NumberLessThan').throws(error_obj);

            sinon.stub(util, 'multiTransfer').resolves([create_buisness_return_dal_obj,get_family_full_return]);
            // let result = await family_service.transferFromFamilyToBusiness(transfer2);
            try{
                let result = await family_service.transferFromFamilyToBusiness(transfer2);
                expect(result[0].balance).to.equal(10300);

            }
            catch(err){
                expect((err as any).message).to.equal('300000 should be less than to 10000');
            }
        })

    })
})

// const transfer3 : ITransfer  = {
//     source_account: "4",
//     destination_account: "5",
//     amount: "2000"
// }
// const error_obj2 : Error  = {
//     name: "something",
//     message: "2000 should be less than to 1000"
// }
// describe('The Buisness Service',  ()=> {
//     before(()=>{
//         sinon.restore();
//     });

//     afterEach(()=>{
//         sinon.restore();
//     });
//     context(`#transfer money properly B to B Diffrent company exceed limit`,()=> {
//         it(`should exist`,()=> {
//             expect(buisness_service.transferSameCurrency).to.be.a('function')
//         })
//         it(`should throw amount exceeds!!!`,async ()=> {
//             sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').onFirstCall().resolves(create_buisness_return_dal_obj as IBusinessAccount).onSecondCall().resolves(create_buisness_return_dal_obj_diffrent_comapny);
//             sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(undefined);
//             sinon.stub(Validator, 'NumberLessThan').throws(error_obj2);
//             // sinon.stub(Validator, 'NumberLessThan').returns(true);

//             sinon.stub(util, 'transfer').resolves([create_buisness_return_dal_obj,get_individual_dal_obj_return]);
//             try{
//                 let result = await buisness_service.transferSameCurrency(transfer3);
//                 expect(result[0].balance).to.equal(103001); // does not get here, throws in the function above

//             }
//             catch(err){
//                 expect((err as any).message).to.equal('2000 should be less than to 1000');
//             }
//         })

//     })
// })