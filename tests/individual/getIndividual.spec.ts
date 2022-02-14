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
        it(`should get the right account_id`,async  ()=> {
            // let x = sinon.stub(individual_dal, 'getIndividualAccountByAccountId').resolves(get_individual_dal_obj_return);
            let stubCB = sinon.stub(individual_dal, 'getIndividualAccountByAccountId');
            // let spyCB = sinon.spy(individual_dal, "getIndividualAccountByAccountId");
            // expect(x.getCall(0).callArgWith(4)).to.be.true;
            // const spy1 = sinon.spy(x);
            // spy1.calledWith(sinon.match('4'))   
            let spy = sinon.spy();
            
            spy();
            await individual_service.getIndividualAccountByAccountId(4)
             console.log('callCount:',stubCB.callCount);
             console.log('args:',stubCB.getCall(0).args);
            //  console.log('spyCB callCount:',spyCB.callCount);
            //  console.log('spyCB args:',spyCB.getCall(0).args);
            // expect(spy.getCall(0).args(sinon.match({account_id:'4'}))).to.be.true;
            // // expect(spy.calledOnceWithExactly(sinon.match({account_id:'5'}))).to.be.true;
            // // expect(spy.calledOnceWithExactly(4)).to.be.true;
            // // expect(spy.calledOnceWithExactly('4')).to.be.true;
            // // let options = spy.getCall(0).args[0];
            // expect(spy.calledWith(sinon.match({
                    
            //       }))).to.equal(4);
            // const spy1 = sinon.spy(x);
            // expect(spy1.calledWith(4)).to.equal(true);
            // sinon.assert.withArgs(spy, sinon.match({ account_id: '45' }));
            // const spy1 = sinon.spy(x);
            // expect(spy1.calledWith(sinon.match({
            //     account_id: 4
            //   }))).to.equal(true);

            // expect(x).to.have.been.calledWith(sinon.match({
            //     foo: 'foo',
            //     bar: 'bar'
            //   }));
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