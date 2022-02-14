/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { expect } from "chai";
import config from "../../config.json";

// import  chai_promise  from "chai-as-promised";
import V from "../../src/validations/validator";
import sinon from "sinon";
import util from '../../src/modules/utils.dal.js';
import individual_dal from "../../src/modules/individual/individual.dal.js";
import buisness_dal from "../../src/modules/business/business.dal.js";
import family_dal from "../../src/modules/family/family.dal.js";
import { account_for_fail_mandatory, account_for_mandatory, account_for_unique, account_obj, business_account, family_account } from "./validation.mocks";
import { account_type } from "../../src/types/types";
import { IIndividualAccount } from "../../src/modules/individual/individual.model";
import { IBusinessAccount } from "../../src/modules/business/business.model";
import { IFamilyAccount } from "../../src/modules/family/family.model";

describe('The validations module',  ()=> {

    before(()=>{
        sinon.restore();
    });

    afterEach(()=>{
        sinon.restore();
    });
    
    // inFamily function
    context(`#inFamily - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.inFamily).to.be.a('function')
            expect(V.inFamily).to.be.instanceOf(Function)
        })
        it(`individual account with id 2 is in family 80`,()=> {
            let actual = V.inFamily(["1","2","3"],"2",80);
            expect(actual).to.equal(true);
        })
    })
    context(`#inFamily - On failure`,()=> {

        it(`individual account with id 2 is not in family 80 - should throw error`,()=> {
            expect(()=>V.inFamily(["1","3"],"2",80)).to.throw("Account 2 is not part of the given family (80).");
        })
    })


    // accountActive function
    context(`#accountActive - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.accountActive).to.be.a('function')
            expect(V.accountActive).to.be.instanceOf(Function)
        })
        it(`account with id 1 is active`,()=> {
            let actual = V.accountActive(1,1);
            expect(actual).to.equal(true);
        })
    })
    context(`#accountActive - On failure`,()=> {

        it(`account with id 1 is not active - should throw error`,()=> {
            expect(()=>V.accountActive(2,1)).to.throw("Account 1 is not active");
        })
    })

    // isAccountExists function
    context(`#isAccountExists - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.isAccountExists).to.be.a('function')
            expect(V.isAccountExists).to.be.instanceOf(Function)
        })
        it(`account with id 1 is exists`,async ()=> {
            sinon.stub(util, 'getAccountById').resolves(account_obj);
            let result = await V.isAccountExists(1);
            expect(result).to.equal(true);
        })
    })
    context(`#isAccountExists - On failure`,()=> {

        it(`account with id 2 doesn't exist - should throw error`,async ()=> {
            sinon.stub(util, 'getAccountById').resolves(account_obj);
            try{
                let result = await V.isAccountExists(2);
                expect(result).to.equal(true);
            } catch(err) {
                expect((err as any).message).to.equal("Account 2 doesn't exist.")
            }
        })
    })

    // NumberEquals function
    context(`#NumberEquals - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.NumberEquals).to.be.a('function')
            expect(V.NumberEquals).to.be.instanceOf(Function)
        })
        it(`individual id (number) is with 7 digits`,()=> {
            let actual = V.NumberEquals([7,"individual_id_input"],[7,"individual_id_allowed"]);
            expect(actual).to.equal(true);
        })
        it(`individual id (string) is with 7 digits`,()=> {
            let actual = V.NumberEquals(["7","individual_id_input"],["7","individual_id_allowed"]);
            expect(actual).to.equal(true);
        })
        it(`individual id (string) is with 7 digits (number)`,()=> {
            let actual = V.NumberEquals(["7","individual_id_input"],[7,"individual_id_allowed"]);
            expect(actual).to.equal(true);
        })
    })
    context(`#NumberEquals - On failure`,()=> {

        it(`individual id (number) is with 8 digits - should throw error`,()=> {
            expect(()=>V.NumberEquals([8,"individual_id_input"],[7,"individual_id_allowed"])).to.throw("individual_id_input should be equal to individual_id_allowed.");
        })
        it(`individual id (string) is with 8 digits - should throw error`,()=> {
            expect(()=>V.NumberEquals(["8","individual_id_input"],["7","individual_id_allowed"])).to.throw("individual_id_input should be equal to individual_id_allowed.");
        })
    })

    // NumberNotEquals function
    context(`#NumberNotEquals - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.NumberNotEquals).to.be.a('function')
            expect(V.NumberNotEquals).to.be.instanceOf(Function)
        })
        it(`source_account (number) is different from destination_account`,()=> {
            let actual = V.NumberNotEquals([17,"source_account"],[18,"destination_account"]);
            expect(actual).to.equal(true);
        })
        it(`source_account (string) is different from destination_account`,()=> {
            let actual = V.NumberNotEquals(["17","source_account"],["18","destination_account"]);
            expect(actual).to.equal(true);
        })
        it(`source_account (string) is different from destination_account (number)`,()=> {
            let actual = V.NumberNotEquals(["17","source_account"],[18,"destination_account"]);
            expect(actual).to.equal(true);
        })
    })
    context(`#NumberNotEquals - On failure`,()=> {

        it(`source_account (number) is the same as destination_account - should throw error`,()=> {
            expect(()=>V.NumberNotEquals([17,"source_account"],[17,"destination_account"])).to.throw("source_account should be different from destination_account.");
        })
        it(`source_account (string) is the same as destination_account - should throw error`,()=> {
            expect(()=>V.NumberNotEquals(["17","source_account"],["17","destination_account"])).to.throw("source_account should be different from destination_account.");
        })
    })


    // NumberGreaterThan function
    context(`#NumberGreaterThan - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.NumberGreaterThan).to.be.a('function')
            expect(V.NumberGreaterThan).to.be.instanceOf(Function)
        })
        it(`company_id (number) is greater than company_id_min_val`,()=> {
            let actual = V.NumberGreaterThan(30,25,"company_id");
            expect(actual).to.equal(true);
        })
        it(`company_id (string) is greater than company_id_min_val`,()=> {
            let actual = V.NumberGreaterThan("30","25","company_id");
            expect(actual).to.equal(true);
        })
        it(`company_id (string) is greater than company_id_min_val (number)`,()=> {
            let actual = V.NumberGreaterThan("30",25,"company_id");
            expect(actual).to.equal(true);
        })
    })
    context(`#NumberGreaterThan - On failure`,()=> {

        it(`company_id (number) is smaller than company_id_min_val (number) - should throw error`,()=> {
            expect(()=>V.NumberGreaterThan("25",30,"company_id")).to.throw("Field company_id = 25, should be greater than 30.");
        })
        it(`company_id (string) is equal to company_id_min_val - should throw error`,()=> {
            expect(()=>V.NumberGreaterThan("20",20,"company_id")).to.throw("Field company_id = 20, should be greater than 20.");
        })
    })

    // NumberLessThan function
    context(`#NumberLessThan - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.NumberLessThan).to.be.a('function')
            expect(V.NumberLessThan).to.be.instanceOf(Function)
        })
        it(`first (number) is smaller than second`,()=> {
            let actual = V.NumberLessThan([2,"first"],[3,"second"]);
            expect(actual).to.equal(true);
        })
        it(`first (string) is smaller than second`,()=> {
            let actual = V.NumberLessThan(["2","first"],["3","second"]);
            expect(actual).to.equal(true);
        })
        it(`first (string) is smaller than second (number)`,()=> {
            let actual = V.NumberLessThan(["2","first"],[3,"second"]);
            expect(actual).to.equal(true);
        })
    })
    context(`#NumberLessThan - On failure`,()=> {

        it(`first (number) is greater than second - should throw error`,()=> {
            expect(()=>V.NumberLessThan([2,"first"],[1,"second"])).to.throw("first should be less than to second.");
        })
        it(`first (string) is equal to second - should throw error`,()=> {
            expect(()=>V.NumberLessThan(["2","first"],["1","second"])).to.throw("first should be less than to second.");
        })
    })

    // isPositive function
    context(`#isPositive - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.isPositive).to.be.a('function')
            expect(V.isPositive).to.be.instanceOf(Function)
        })
        it(`input should be positive`,()=> {
            let actual = V.isPositive('2',"input");
            expect(actual).to.equal(true);
        })
    })
    context(`#isPositive - On failure`,()=> {

        it(`input -1 should throw error`,()=> {
            expect(()=>V.isPositive('-1',"input")).to.throw("input should be positive.");
        })
        it(`input 0 should throw error`,()=> {
            expect(()=>V.isPositive('0',"input")).to.throw("input should be positive.");
        })
    })

    // IndividualIDUnique function
    context(`#IndividualIDUnique - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.IndividualIDUnique).to.be.a('function')
            expect(V.IndividualIDUnique).to.be.instanceOf(Function)
        })
        it(`indiviual id is unique`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualsByIndividualsIds').resolves([]);
            let result = await V.IndividualIDUnique("1234","indiviual id");
            expect(result).to.equal(true);
        })
    })
    context(`#IndividualIDUnique - On failure`,()=> {

        it(`indiviual id is not unique - should throw error`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualsByIndividualsIds').resolves(account_for_unique);
            try{
                let result = await V.IndividualIDUnique("9","indiviual id");
                expect(result).to.equal(true);
            } catch(err) {
                expect((err as any).message).to.equal("indiviual id 9 should be unique.")
            }
        })
    })

    // stringNotEmpty function
    context(`#stringNotEmpty - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.stringNotEmpty).to.be.a('function')
            expect(V.stringNotEmpty).to.be.instanceOf(Function)
        })
        it(`input should be string`,()=> {
            let actual = V.stringNotEmpty("value");
            expect(actual).to.equal(true);
        })
    })
    context(`#stringNotEmpty - On failure`,()=> {

        it(`input "" should throw error`,()=> {
            expect(()=>V.stringNotEmpty("")).to.throw("value is not a string");
        })
    })

    // mandatoryFieldExists function
    context(`#mandatoryFieldExists - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.mandatoryFieldExists).to.be.a('function')
            expect(V.mandatoryFieldExists).to.be.instanceOf(Function)
        })
        it(`all mandatory field exists is true`,()=> {
            let actual = V.mandatoryFieldExists(account_for_mandatory,['individual_id', 'first_name', 'last_name', 'currency']);
            expect(actual).to.equal(true);
        })
    })
    context(`#mandatoryFieldExists - On failure`,()=> {

        it(`input without mandatory field should throw error`,()=> {
            expect(()=>V.mandatoryFieldExists(account_for_fail_mandatory,['individual_id', 'first_name', 'last_name', 'currency'])).to.throw("mandatory field individual_id is missing.");
        })
    })

    // isValNumeric function
    context(`#isValNumeric - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.isValNumeric).to.be.a('function')
            expect(V.isValNumeric).to.be.instanceOf(Function)
        })
        it(`balance (number) is numeric`,()=> {
            let actual = V.isValNumeric(5300,"balance");
            expect(actual).to.equal(true);
        })
        it(`balance (string) is numeric`,()=> {
            let actual = V.isValNumeric("5300","balance");
            expect(actual).to.equal(true);
        })
    })
    context(`#isValNumeric - On failure`,()=> {

        it(`balance not numeric should throw error`,()=> {
            expect(()=>V.isValNumeric("abcs","balance")).to.throw("Field balance value is not numeric");
        })
    })

    // checkAccountTypeEquals function
    context(`#checkAccountTypeEquals - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.checkAccountTypeEquals).to.be.a('function')
            expect(V.checkAccountTypeEquals).to.be.instanceOf(Function)
        })
        it(`account id 6 is business account`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualByAccountId').resolves(undefined as unknown as IIndividualAccount);
            sinon.stub(buisness_dal, 'getBusinessByAccountId').resolves(business_account);
            sinon.stub(family_dal, 'getFamilyByAccountId').resolves(undefined as unknown as IFamilyAccount);
            let result = await V.checkAccountTypeEquals(6,[account_type.BUSINESS]);
            console.log({result})
            expect(result).to.equal(true);
        })
    })
    context(`#checkAccountTypeEquals - On failure`,()=> {

        it(`account id 8 is not business account - should throw error`,async ()=> {
            sinon.stub(individual_dal, 'getIndividualByAccountId').resolves([] as unknown as IIndividualAccount);
            sinon.stub(buisness_dal, 'getBusinessByAccountId').resolves([] as unknown as IBusinessAccount);
            sinon.stub(family_dal, 'getFamilyByAccountId').resolves(family_account);            
            try{
                let result = await V.checkAccountTypeEquals(8,[account_type.BUSINESS]);
                expect(result).to.equal(true);
            } catch(err) {
                expect((err as any).message).to.equal("Expected account type of business, but got family.")
            }
        })

    });

    // checkAccountCurrencyEquals function
    context(`#checkAccountCurrencyEquals - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.checkAccountCurrencyEquals).to.be.a('function')
            expect(V.checkAccountCurrencyEquals).to.be.instanceOf(Function)
        })
        it(`USD source currency equal to USD destination currency`,()=> {
            let actual = V.checkAccountCurrencyEquals(["USD", "source account currency"], ["USD", "desination account currency"]);
            expect(actual).to.equal(true);
        })
        it(`EUR source currency equal to EUR destination currency`,()=> {
            let actual = V.checkAccountCurrencyEquals(["EUR", "source account currency"], ["EUR", "desination account currency"]);
            expect(actual).to.equal(true);
        })
    })
    context(`#checkAccountCurrencyEquals - On failure`,()=> {

        it(`USD source currency not equal to EUR destination currency - should throw error`,()=> {
            expect(()=>V.checkAccountCurrencyEquals(["USD", "source account currency"],["EUR", "desination account currency"])).to.throw("desination account currency(EUR) should be equal to source account currency(USD)");
        })
    })

    // balanceGreaterThan function
    context(`#balanceGreaterThan - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.balanceGreaterThan).to.be.a('function')
            expect(V.balanceGreaterThan).to.be.instanceOf(Function)
        })
        it(`business balance after transfer (number) is okay`, ()=> {
            sinon.stub(V, 'isValNumeric').returns(true);
            let result = V.balanceGreaterThan(50000,"business balance after transfer",10000,"business minimum balance");
            expect(result).to.equal(true);
        })
        it(`business balance after transfer (string) is okay`, ()=> {
            sinon.stub(V, 'isValNumeric').returns(true);
            let result = V.balanceGreaterThan("50000","business balance after transfer","10000","business minimum balance");
            expect(result).to.equal(true);
        })
    })

    context(`#balanceGreaterThan - On failure`,()=> {

        it(`business balance after transfer below minimum - should throw error`, ()=> {
            sinon.stub(V, 'isValNumeric').returns(true);
            try{
                let result = V.balanceGreaterThan(500,"business balance after transfer",10000,"business minimum balance");
                expect(result).to.equal(true);
            } catch(err) {
                expect((err as any).message).to.equal("business balance after transfer should be greater than business minimum balance.")
            }
        })
    })

    // currencyIsValid function
    context(`#currencyIsValid - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.currencyIsValid).to.be.a('function')
            expect(V.currencyIsValid).to.be.instanceOf(Function)
        })
        it(`USD currency is okay`, ()=> {
            let result = V.currencyIsValid("USD");
            expect(result).to.equal(true);
        })
        it(`EUR currency is okay`, ()=> {
            let result = V.currencyIsValid("EUR");
            expect(result).to.equal(true);
        })
    })

    context(`#currencyIsValid - On failure`,()=> {

        it(`YYY currency is not okay`, ()=> {
            expect(()=>V.currencyIsValid("YYY")).to.throw(`Invalid currency, got YYY and support only: ${config.currencies}.`);
        })
    })


    // accountStatusNotEquals function
    context(`#accountStatusNotEquals - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.accountStatusNotEquals).to.be.a('function')
            expect(V.accountStatusNotEquals).to.be.instanceOf(Function)
        })
        it(`ACTIVE !== INACTIVE`, ()=> {
            let result = V.accountStatusNotEquals("ACTIVE","INACTIVE");
            expect(result).to.equal(true);
        })
        it(`ACTIVE !== inactive`, ()=> {
            let result = V.accountStatusNotEquals("ACTIVE","INACTIVE");
            expect(result).to.equal(true);
        })
    })

    context(`#accountStatusNotEquals - On failure`,()=> {

        it(`ACTIVE !== ACTIVE should throw error`, ()=> {
            expect(()=>V.accountStatusNotEquals("ACTIVE","ACTIVE")).to.throw(`At least one of the provided accounts has equal status as the provided action.`);
        })
        it(`ACTIVE !== active should throw error`, ()=> {
            expect(()=>V.accountStatusNotEquals("ACTIVE","active")).to.throw(`At least one of the provided accounts has equal status as the provided action.`);
        })
    })

    // accountStatusEquals function
    context(`#accountStatusEquals - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.accountStatusEquals).to.be.a('function')
            expect(V.accountStatusEquals).to.be.instanceOf(Function)
        })
        it(`ACTIVE === ACTIVE`, ()=> {
            let result = V.accountStatusEquals([1,"source account status"],[1,"Active"]);
            expect(result).to.equal(true);
        })
        it(`ACTIVE === active`, ()=> {
            let result = V.accountStatusEquals([1,"source account status"],[1,"Active"]);
            expect(result).to.equal(true);
        })

    })

    context(`#accountStatusEquals - On failure`,()=> {

        it(`ACTIVE === INACTIVE should throw error`, ()=> {
            expect(()=>V.accountStatusEquals([1,"source account status"],[2,"INACTIVE"])).to.throw(`source account status should be INACTIVE but it is ACTIVE.`);
        })
        it(`ACTIVE === inactive should throw error`, ()=> {
            expect(()=>V.accountStatusEquals([1,"source account status"],[2,"inactive"])).to.throw(`source account status should be inactive but it is ACTIVE.`);
        })
    })

    // emailValidation function
    context(`#emailValidation - On Success`,()=> {

        it(`should exist as function`,()=> {
            expect(V.emailValidation).to.be.a('function')
            expect(V.emailValidation).to.be.instanceOf(Function)
        })
        it(`john.doe@gmail.com is valid`, ()=> {
            let result = V.emailValidation("john.doe@gmail.com");
            expect(result).to.equal(true);
        })
        it(`john.doe@gmail.net is valid`, ()=> {
            let result = V.emailValidation("john.doe@gmail.net");
            expect(result).to.equal(true);
        })
    })
    context(`#emailValidation - On failure`,()=> {

        it(`john.doegmail.net is not valid- should throw error`, ()=> {
            expect(()=>V.emailValidation("john.doegmail.net")).to.throw(`john.doegmail.net is not valid email addtress`);
        })
    })

    // isTypeArray function
    context(`#isTypeArray - On Success`,()=> {

        it(`gets array as input`,()=> {
            expect(V.isTypeArray).to.be.a('function')
            expect(V.isTypeArray).to.be.instanceOf(Function)
        })
        it(`input is array`, ()=> {
            let result = V.isTypeArray([["22","1000"],["29","1000"]],"individuals to add");
            expect(result).to.equal(true);
        })
    })
    context(`#isTypeArray - On failure`,()=> {

        it(`input is not array- should throw error`, ()=> {
            expect(()=>V.isTypeArray("22","individuals to add")).to.throw(`Field individuals to add input should be array.`);
        })
    })

});
