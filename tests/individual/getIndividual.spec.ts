/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
import individual_service from "../../src/modules/individual/individual.service.js";
import individual_dal from "../../src/modules/individual/individual.dal.js";
import sinon from "sinon";
import { IIndividualAccount } from "../../src/modules/individual/individual.model.js";
import { get_individual_dal_obj_return}  from "./individual.mocks.js";
describe('The Individual Service',  ()=> {
    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });

    

    context(`# Get Individual`,()=> {
        it(`should exist`,()=> {
            expect(individual_service.getIndividualAccountByAccountId).to.be.a('function')
        })
        it(`should get the right account_id`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return);
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).account_id).to.be.equal(4)
        })
        it(`should get the right currency`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).currency).to.be.equal('USD')
        })
        it(`should get the right balance`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).balance).to.be.equal(10300)
        })
        it(`should get the right status_id`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).status_id).to.be.equal(1)
        })
        it(`should get the right individual_id`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).individual_id).to.be.equal(2346567)
        })
        it(`should get the right first_name`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).first_name).to.be.equal('Tal')
        })
        it(`should get the right email`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).email).to.be.equal(undefined)
        })
        it(`should get the right country_name`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return
        );
            let result = await individual_service.getIndividualAccountByAccountId(4)
            expect((result as IIndividualAccount).address?.country_name).to.be.equal('Israel')
        })

    })
})