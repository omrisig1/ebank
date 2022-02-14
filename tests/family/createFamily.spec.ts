// /* eslint-disable @typescript-eslint/unbound-method */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { expect } from "chai";
// import family_service from "../../src/modules/family/family.service.js";
// import family_dal from "../../src/modules/family/family.dal.js";
// import sinon from "sinon";
// import { IFamilyAccount } from "../../src/modules/family/family.model.js";
// import { get_family_full_return } from "./family.mocks.js";
// import { IIndividualAccount } from "../../src/modules/individual/individual.model.js";
// describe('The Family Service',  ()=> {
//     before(()=>{
//         sinon.restore();
//     });

//     afterEach(()=>{
//         sinon.restore();
//     });

    

//     context(`# Create family`,()=> {
//         it(`should exist`,()=> {
//             expect(family_service.createNewFamilyAccount).to.be.a('function')
//         })
//         it(`should get the right account_id`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return);
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((result as IFamilyAccount).account_id).to.be.equal(4)
//         })
//         it(`should get the right currency`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((result as IFamilyAccount).currency).to.be.equal('USD')
//         })
//         it(`should get the right balance`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((result as IFamilyAccount).balance).to.be.equal(21000)
//         })
//         it(`should get the right status_id`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((result as IFamilyAccount).status_id).to.be.equal(1)
//         })
//         it(`should get the right individual_id`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((result as IFamilyAccount).context).to.be.equal("billing")
//         })
//         it(`should get the right first_name`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((result as IFamilyAccount).owners).to.be.an('array')
//         })
//         it(`should get the right first_name`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((
//                 ((result as IFamilyAccount).owners) as IIndividualAccount[])[0]).to.deep.include({account_id: 51});
//         })
//         it(`should get the right first_name`,async ()=> {
//             sinon.stub(family_dal, 'getFamilyAccountByAccountId').resolves(get_family_full_return
//         );
//             let result = await family_service.createNewFamilyAccount(4)
//             expect((
//                 ((result as IFamilyAccount).owners) as IIndividualAccount[])[0]).to.deep.include({individual_id: 1000154});
//         })

//     })
// })