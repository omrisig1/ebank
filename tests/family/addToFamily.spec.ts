/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
import {IAddIndividualsToFamily} from "../../src/types/types.js";
import family_service from "../../src/modules/family/family.service.js";
import family_dal from "../../src/modules/family/family.dal.js";

import sinon from "sinon";
import { IIndividualAccount } from "../../src/modules/individual/individual.model.js";
const json2 = {"owners": [
    {
        "account_id": 51,
        "currency": "USD",
        "balance": 821000,
        "status_id": 1,
        "a_date": "2022-02-13T10:54:35.000Z",
        "e_date": "2022-02-13T10:54:35.000Z",
        "individual_id": 1000154,
        "first_name": "omri7",
        "last_name": "Cohen",
        "email": "omri@gmail.com",
        "black_list": false,
        "address": {
            "address_id": 21,
            "country_name": "oklslsa",
            "country_code": "",
            "postal_code": "",
            "city": "",
            "region": "",
            "street_name": "",
            "street_number": ""
        }
    },
    {
        "account_id": 85,
        "currency": "USD",
        "balance": 89000,
        "status_id": 1,
        "individual_id": 1000174,
        "first_name": "omri7",
        "last_name": "Cohen",
        "email": "omri@gmail.com",
        "black_list": false,
        "address": {
            "address_id": 41,
            "country_name": "oklslsa",
            "country_code": "",
            "postal_code": "",
            "city": "",
            "region": "",
            "street_name": "",
            "street_number": ""
        }
    }
]}
const json ={

    "account_id": 83,
    "currency": "USD",
    "balance": 21000,
    "status_id": 1,
    "context": undefined,
    "owners": [
        {
            "account_id": 51,
            "currency": "USD",
            "balance": 821000,
            "status_id": 1,
            "a_date": "2022-02-13T10:54:35.000Z",
            "e_date": "2022-02-13T10:54:35.000Z",
            "individual_id": 1000154,
            "first_name": "omri7",
            "last_name": "Cohen",
            "email": "omri@gmail.com",
            "black_list": false,
            "address": {
                "address_id": 21,
                "country_name": "oklslsa",
                "country_code": "",
                "postal_code": "",
                "city": "",
                "region": "",
                "street_name": "",
                "street_number": ""
            }
        },
        {
            "account_id": 85,
            "currency": "USD",
            "balance": 89000,
            "status_id": 1,
            "individual_id": 1000174,
            "first_name": "omri7",
            "last_name": "Cohen",
            "email": "omri@gmail.com",
            "black_list": false,
            "address": {
                "address_id": 41,
                "country_name": "oklslsa",
                "country_code": "",
                "postal_code": "",
                "city": "",
                "region": "",
                "street_name": "",
                "street_number": ""
            }
        }
    ]
}
const json2_not_active = {"owners": [
    {
        "account_id": 51,
        "currency": "USD",
        "balance": 821000,
        "status_id": 0,
        "a_date": "2022-02-13T10:54:35.000Z",
        "e_date": "2022-02-13T10:54:35.000Z",
        "individual_id": 1000154,
        "first_name": "omri7",
        "last_name": "Cohen",
        "email": "omri@gmail.com",
        "black_list": false,
        "address": {
            "address_id": 21,
            "country_name": "oklslsa",
            "country_code": "",
            "postal_code": "",
            "city": "",
            "region": "",
            "street_name": "",
            "street_number": ""
        }
    },
    {
        "account_id": 85,
        "currency": "USD",
        "balance": 89000,
        "status_id": 1,
        "individual_id": 1000174,
        "first_name": "omri7",
        "last_name": "Cohen",
        "email": "omri@gmail.com",
        "black_list": false,
        "address": {
            "address_id": 41,
            "country_name": "oklslsa",
            "country_code": "",
            "postal_code": "",
            "city": "",
            "region": "",
            "street_name": "",
            "street_number": ""
        }
    }
]}
const json_not_active ={

    "account_id": 83,
    "currency": "USD",
    "balance": 21000,
    "status_id": 1,
    "context": undefined,
    "owners": [
        {
            "account_id": 51,
            "currency": "USD",
            "balance": 821000,
            "status_id": 1,
            "a_date": "2022-02-13T10:54:35.000Z",
            "e_date": "2022-02-13T10:54:35.000Z",
            "individual_id": 1000154,
            "first_name": "omri7",
            "last_name": "Cohen",
            "email": "omri@gmail.com",
            "black_list": false,
            "address": {
                "address_id": 21,
                "country_name": "oklslsa",
                "country_code": "",
                "postal_code": "",
                "city": "",
                "region": "",
                "street_name": "",
                "street_number": ""
            }
        },
        {
            "account_id": 85,
            "currency": "USD",
            "balance": 89000,
            "status_id": 1,
            "individual_id": 1000174,
            "first_name": "omri7",
            "last_name": "Cohen",
            "email": "omri@gmail.com",
            "black_list": false,
            "address": {
                "address_id": 41,
                "country_name": "oklslsa",
                "country_code": "",
                "postal_code": "",
                "city": "",
                "region": "",
                "street_name": "",
                "street_number": ""
            }
        }
    ]
}
describe('The Family Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });

    
    
    
    context(`# add to family`,()=> {
        it(`should exist`,()=> {
            expect(family_service.addIndividualsToFamily).to.be.a('function')
        })
        it(`should get the right account_id1`,async ()=> {
            let stubCB = sinon.stub(family_service, 'generateIndividualsNewBalancesList');
            sinon.stub(family_service, 'getIndividualAccountsByTuplesList').resolves(json2 .owners as unknown as IIndividualAccount[]);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(json);
            sinon.stub(family_dal, 'addFamilyOwners');

            let spy = sinon.spy();
            const individuals_to_add: IAddIndividualsToFamily = {
                individuals_to_add: [["1234567","1000"]]
            }
            spy();
            await family_service.addIndividualsToFamily(4,"short",individuals_to_add);
             expect(stubCB.getCall(0).args[0].length).to.equal(2);
        })
        it(`should get the right account_id2`,async ()=> {
            let stubCB = sinon.stub(family_service, 'generateIndividualsNewBalancesList');
            sinon.stub(family_service, 'getIndividualAccountsByTuplesList').resolves(json2 .owners as unknown as IIndividualAccount[]);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(json);
            sinon.stub(family_dal, 'addFamilyOwners');
            let spy = sinon.spy();
            const individuals_to_add: IAddIndividualsToFamily = {
                individuals_to_add: [["1234567","1000"]]
            }
            spy();
            await family_service.addIndividualsToFamily(4,"short",individuals_to_add);
             expect(stubCB.getCall(0).args[0][0].account_id).to.equal(51);

        })
        it(`should get the right account_id3`,async ()=> {
            let stubCB = sinon.stub(family_service, 'generateIndividualsNewBalancesList');
            sinon.stub(family_service, 'getIndividualAccountsByTuplesList').resolves(json2 .owners as unknown as IIndividualAccount[]);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(json);
            sinon.stub(family_dal, 'addFamilyOwners');
            let spy = sinon.spy();
            const individuals_to_add: IAddIndividualsToFamily = {
                individuals_to_add: [["1234567","1000"]]
            }
            spy();
            await family_service.addIndividualsToFamily(4,"short",individuals_to_add);
             expect(stubCB.getCall(0).args[0][1].account_id).to.equal(85);
        })

    })

    context(`# add to family not active and active`,()=> {
        it(`should exist`,()=> {
            expect(family_service.addIndividualsToFamily).to.be.a('function')
        })
        it(`should get the right account_id11`,async ()=> {
            let stubCB = sinon.stub(family_service, 'generateIndividualsNewBalancesList');
            sinon.stub(family_service, 'getIndividualAccountsByTuplesList').resolves(json2_not_active.owners as unknown as IIndividualAccount[]);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(json_not_active);
            sinon.stub(family_dal, 'addFamilyOwners');

            let spy = sinon.spy();
            const individuals_to_add: IAddIndividualsToFamily = {
                individuals_to_add: [["1234567","1000"]]
            }
            spy();
            await family_service.addIndividualsToFamily(4,"short",individuals_to_add);
             expect(stubCB.getCall(0).args[0].length).to.equal(1);
        })
        it(`should get the right account_id22`,async ()=> {
            let stubCB = sinon.stub(family_service, 'generateIndividualsNewBalancesList');
            sinon.stub(family_service, 'getIndividualAccountsByTuplesList').resolves(json2_not_active.owners as unknown as IIndividualAccount[]);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(json_not_active);
            sinon.stub(family_dal, 'addFamilyOwners');
            let spy = sinon.spy();
            const individuals_to_add: IAddIndividualsToFamily = {
                individuals_to_add: [["1234567","1000"]]
            }
            spy();
            await family_service.addIndividualsToFamily(4,"short",individuals_to_add);
             expect(stubCB.getCall(0).args[0][0].account_id).to.equal(85);

        })
        it(`should get the right account_id33`,async ()=> {
            let stubCB = sinon.stub(family_service, 'generateIndividualsNewBalancesList');
            sinon.stub(family_service, 'getIndividualAccountsByTuplesList').resolves(json2_not_active.owners as unknown as IIndividualAccount[]);
            sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(json_not_active);
            sinon.stub(family_dal, 'addFamilyOwners');
            let spy = sinon.spy();
            const individuals_to_add: IAddIndividualsToFamily = {
                individuals_to_add: [["1234567","1000"]]
            }
            spy();
            await family_service.addIndividualsToFamily(4,"short",individuals_to_add);
             expect(stubCB.getCall(0).args[0][1]?.account_id).to.be.undefined
        })

    })
})