/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
import buisness_service from "../../src/modules/business/business.service.js";
import buisness_dal from "../../src/modules/business/business.dal.js";
import sinon from "sinon";
// import {get_buisness_dal_obj_return} from "./buisness.mocks.js";
import {  create_buisness_dal_input,create_buisness_dal_input_no_balance,create_buisness_dal_input_with_status_id,create_buisness_dal_obj_balance_0,create_buisness_return_dal_obj, create_buisness_dal_input_with_black_list}  from "./buisness.mocks.js";
import { IBusinessAccount } from "../../src/modules/business/business.model.js";

describe('The Buisness Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });

   
    context(`# Create Buisness account`,()=> {
        it(`should exist`,()=> {
            expect(buisness_service.createNewBusinessAccount).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj  as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).account_id).to.equal(4)
        })
        it(`should get the right currency`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).currency).to.be.equal('USD')
        })
        it(`should get the right balance`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).balance).to.be.equal(10300)
        })
        it(`should get the right status_id`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).status_id).to.be.equal(1)
        })
        it(`should get the right company name`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).company_name).to.be.equal('rapyd')
        })
        it(`should get the right comapny id`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).company_id).to.be.equal(12345678)
        })
        it(`should get the right country_name`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).address?.country_name).to.be.equal('Israel')
        })
        it(`should get the right black list`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input as IBusinessAccount)
            expect((result as IBusinessAccount).black_list).to.be.equal(false)
        })

    })


    context(`# Create Buisness account without sending balance`,()=> {
        it(`should exist`,()=> {
            expect(buisness_service.createNewBusinessAccount).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_dal_obj_balance_0 as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input_no_balance as IBusinessAccount)
            expect((result as IBusinessAccount).account_id).to.be.equal(4)
        })
        it(`should get the right balance`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_dal_obj_balance_0);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input_no_balance as IBusinessAccount)
            expect((result as IBusinessAccount).balance).to.be.equal(0);
        })
    })

    context(`# Create Buisness account with sending status`,()=> {
        it(`should exist`,()=> {
            expect(buisness_service.createNewBusinessAccount).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input_with_status_id as IBusinessAccount)
            expect((result as IBusinessAccount).account_id).to.be.equal(4);
        })
        it(`should get the right status`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input_with_status_id as IBusinessAccount)
            expect((result as IBusinessAccount).status_id).to.be.equal(1);
        })
    })

    context(`# Create Buisness account with sending black list`,()=> {
        it(`should exist`,()=> {
            expect(buisness_service.createNewBusinessAccount).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj as IBusinessAccount);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input_with_black_list as IBusinessAccount)
            expect((result as IBusinessAccount).account_id).to.be.equal(4);
        })
        it(`should get the right black list`,async ()=> {
            sinon.stub(buisness_dal, 'createBusinessAccount').resolves(create_buisness_return_dal_obj);
            let result = await buisness_service.createNewBusinessAccount(create_buisness_dal_input_with_black_list as IBusinessAccount)
            expect((result as IBusinessAccount).black_list).to.be.equal(false);
        })
    })
})