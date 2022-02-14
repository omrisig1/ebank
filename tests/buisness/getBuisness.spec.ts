/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
import buisness_service from "../../src/modules/business/business.service.js";
import buisness_dal from "../../src/modules/business/business.dal.js";
import sinon from "sinon";
import {get_buisness_dal_obj_return} from "./buisness.mocks.js";
describe('The Buisness Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });

   
    context(`# Get Buisness account`,()=> {
        it(`should exist`,()=> {
            expect(buisness_service.getBusinessAccountById).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).account_id).to.be.equal(4)
        })
        it(`should get the right currency`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).currency).to.be.equal('USD')
        })
        it(`should get the right balance`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).balance).to.be.equal(10300)
        })
        it(`should get the right status_id`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).status_id).to.be.equal(1)
        })
        it(`should get the right company name`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).company_name).to.be.equal('rapyd')
        })
        it(`should get the right comapny id`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).company_id).to.be.equal(12345678)
        })
        it(`should get the right country_name`,async ()=> {
            sinon.stub(buisness_dal, 'getBusinessAccountByAccountId').resolves(get_buisness_dal_obj_return);
            let result = await buisness_service.getBusinessAccountById(4)
            expect((result).address?.country_name).to.be.equal('Israel')
        })

    })
})