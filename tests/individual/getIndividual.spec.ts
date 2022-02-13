/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
// import * as B_service from "../../src/modules/business/business.service";
import individual_service from "../../src/modules/individual/individual.service";
import individual_dal from "../../src/modules/individual/individual.dal";

// import * as B_dal from "../../src/modules/business/business.dal";
// import * as util from "../../src/modules/utils.dal";
import sinon from "sinon";
import { IIndividualAccount } from "../../src/modules/individual/individual.model.js";
// import * as V from "../../src/validations/validator.js";
// import { ITransfer } from "../../src/types/types.js";
// import IAccount from "../../src/modules/account.model.js";

// const Validator = {...V};
// const IndividualDal = {...dal};
// console.log('individual: ', IndividualDal);
// const IndividualDal_fun = {...IndividualDal};

// console.log('is same func',IndividualDal.getIndividualByAccountId === dal.getIndividualByAccountId)

describe('The Individual Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });

    // sinon.stub(connection, 'getIndividualAccountByAccountId').resolves({
    //     account_id: 4,
    //     currency: 'USD'})
    const dal_obj = {
        account_id: 4,
        currency: 'USD',
        balance: 10300,
        status_id: 1,
        individual_id: 2346567,
        first_name: 'Tal',
        last_name: 'Jon',
        email: undefined,
        black_list: undefined,
        address: {
          address_id: 4,
          country_name: 'Israel',
          country_code: '1234',
          postal_code: '233',
          city: 'Tel-Aviv',
          region: 'Center',
          street_name: 'Hashalom',
          street_number: "154",
        }
      }
    // sinon.stub(IndividualDal, 'getIndividualAccountByAccountId').resolves(dal_obj);

    // sinon.stub(util, 'multiTransfer').resolves(3 as unknown as IAccount[]);

    // let transfer : ITransfer = {
    //     source_account : "1234567",
    //     destination_account :"12345678",
    //     amount: "200"
    // }
    //source,destination,amouint
    context(`# get individual`,()=> {
        it(`should exist`,()=> {
            // sinon.stub(IndividualDal, 'getIndividualAccountByAccountId').resolves(dal_obj);
            expect(individual_service.getIndividualAccountByAccountId).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(dal_obj);
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).account_id).to.be.equal(4)

        })
      

    })
})