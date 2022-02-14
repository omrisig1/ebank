/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { expect } from "chai";
// import  chai_promise  from "chai-as-promised";
import V from "../../src/validations/validator";
import sinon from "sinon";
import util from '../../src/modules/utils.dal.js';
import individual_dal from "../../src/modules/individual/individual.dal.js";
import { account_for_mandatory, account_for_unique, account_obj } from "./validation.mocks";

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
            expect(()=>V.NumberGreaterThan("25",30,"company_id")).to.throw("Field company_id - 25 should be greater than 30.");
        })
        it(`company_id (string) is equal to company_id_min_val - should throw error`,()=> {
            expect(()=>V.NumberGreaterThan("20",20,"company_id")).to.throw("Field company_id - 20 should be greater than 20.");
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
    // context(`#mandatoryFieldExists - On failure`,()=> {

    //     it(`input "" should throw error`,()=> {
    //         expect(()=>V.mandatoryFieldExists("")).to.throw("value is not a string");
    //     })
    // })

});

//     context(`#mandatoryFieldExists`,()=> {
//         it(`should exist`,()=> {
//             expect(V.mandatoryFieldExists).to.be.a('function')
//             expect(V.mandatoryFieldExists).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.mandatoryFieldExists([],[]);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.mandatoryFieldExists({hi:'hi'},[]);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.mandatoryFieldExists({hi:'hi there'},['hi']);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.mandatoryFieldExists({hi:'hi there'},['no']);
//             expect(actual).to.equal(true)
//         })
    
//     })
    
//     context(`#isValNumeric`,()=> {
//         it(`should exist`,()=> {
//             expect(V.isValNumeric).to.be.a('function')
//             expect(V.isValNumeric).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isValNumeric('1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isValNumeric(1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isValNumeric('0');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isValNumeric(0);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.isValNumeric('');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.isValNumeric(undefined);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.isValNumeric('ffgfggg');
//             expect(actual).to.equal(true)
//         })
    
//     })
      
//     context(`#stringLengthAtLeast`,()=> {
//         it(`should exist`,()=> {
//             expect(V.stringLengthAtLeast).to.be.a('function')
//             expect(V.stringLengthAtLeast).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.stringLengthAtLeast('2',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.stringLengthAtLeast('2',2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthAtLeast('gfgfgfg',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthAtLeast('1',2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthAtLeast('fdsfsdfsdfs',99999);
//             expect(actual).to.equal(true)
//         })
    
//     })

//     context(`#stringLengthEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.stringLengthEquals).to.be.a('function')
//             expect(V.stringLengthEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.stringLengthEquals('0',0);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.stringLengthEquals('2',2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthEquals('gfgfgfg',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthEquals('1',2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthEquals('fdsfsdfsdfs',99999);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringLengthEquals('2',1);
//             expect(actual).to.equal(true)
//         })
    
//     })

//     context(`#transferSizeSmallerThan`,()=> {
//         it(`should exist`,()=> {
//             expect(V.transferSizeSmallerThan).to.be.a('function')
//             expect(V.transferSizeSmallerThan).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.transferSizeSmallerThan('INDIVIDUAL','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.transferSizeSmallerThan('INDIVIDUAL','99');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.transferSizeSmallerThan('INDIVIDUAL','99999');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.transferSizeSmallerThan('BUISNESS','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.transferSizeSmallerThan('BUISNESS','99');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.transferSizeSmallerThan('BUISNESS','99999');
//             expect(actual).to.equal(true)
//         })
    
//     })

//     context(`#checkAccountTypeEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.checkAccountTypeEquals).to.be.a('function')
//             expect(V.checkAccountTypeEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.checkAccountTypeEquals('STR','STR');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.checkAccountTypeEquals('1','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.checkAccountTypeEquals('1','2');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.checkAccountTypeEquals('fsdfs','fsdfs');
//             expect(actual).to.equal(true)
//         })
    
//     })
   
//     context(`#checkAccountTypeNotEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.checkAccountTypeNotEquals).to.be.a('function')
//             expect(V.checkAccountTypeNotEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.checkAccountTypeNotEquals('1','2');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.checkAccountTypeNotEquals('fsdfs','fsdfs');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.checkAccountTypeNotEquals('STR','STR');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.checkAccountTypeNotEquals('1','1');
//             expect(actual).to.equal(true)
//         })
       
//     })
     
//     context(`#checkAccountCurrencyEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.checkAccountCurrencyEquals).to.be.a('function')
//             expect(V.checkAccountCurrencyEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.checkAccountCurrencyEquals('STR','STR');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.checkAccountCurrencyEquals('1','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.checkAccountCurrencyEquals('1','2');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.checkAccountCurrencyEquals('fsdfs','fsdfs');
//             expect(actual).to.equal(true)
//         })
    
//     })

//     context(`#balanceGreaterThan`,()=> {
//         it(`should exist`,()=> {
//             expect(V.balanceGreaterThan).to.be.a('function')
//             expect(V.balanceGreaterThan).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.balanceGreaterThan(2,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.balanceGreaterThan('2','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.balanceGreaterThan('2',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.balanceGreaterThan(1,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.balanceGreaterThan('1','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.balanceGreaterThan('1',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.balanceGreaterThan(1,2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.balanceGreaterThan('1','2');
//             expect(actual).to.equal(true)
//         })
//         it(`should be throw`,()=> {
//             let actual = V.balanceGreaterThan('1',2);
//             expect(actual).to.equal(true)
//         })
//     })
    
//     context(`#currencyIsValid`,()=> {
//         it(`should exist`,()=> {
//             expect(V.currencyIsValid).to.be.a('function')
//             expect(V.currencyIsValid).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.currencyIsValid('USD');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.currencyIsValid('EUR');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.currencyIsValid('');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.currencyIsValid('ffsdfsdfs');
//             expect(actual).to.equal(true)
//         })
    
//     })
//     context(`#accountStatusEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.accountStatusEquals).to.be.a('function')
//             expect(V.accountStatusEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.accountStatusEquals(1,'1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.accountStatusEquals(1,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(undefined,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(undefined,'1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(2,'1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(2,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be ok`,()=> {
//             let actual = V.accountStatusEquals(true,'1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(false,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be ok`,()=> {
//             let actual = V.accountStatusEquals(true,true);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(false,true);
//             expect(actual).to.equal(true)
//         })
//         it(`should be ok`,()=> {
//             let actual = V.accountStatusEquals(true,'1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusEquals(false,1);
//             expect(actual).to.equal(true)
//         })
    
//     })

//     context(`#accountStatusNotEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.accountStatusNotEquals).to.be.a('function')
//             expect(V.accountStatusNotEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.accountStatusNotEquals('2','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusNotEquals('dsds','dsds');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.accountStatusNotEquals('1','1');
//             expect(actual).to.equal(true)
//         })
        
    
//     })


      
//     // export function IndividualIDUnique(str:string) :string{
//     //     Send id in db
//     //     Send id not in db
        
      
        
// })

//     /* context(`#multiply`,()=> {

//         it(`should exist`) // <-- pending...

//         it(`should multiply two numbers`,()=>{
//             throw new Error('kabooom!!!') // <-- test fails...
//             let actual = multiply(2,3);
//             expect(actual).to.deep.equal([6])
//         })
//         it(`should muliply several numbers`,()=> {
//             // passing as long as assertion didn't fail
//             // or an error was thrown...
//         })

//     }) */
// //     context(`#multiply`,()=> {

// //         it(`should exist`,()=> {
// //             expect(sum).to.be.a('function')
// //             expect(sum).to.be.instanceOf(Function)
// //         })

// //         it(`should multiply two numbers`,()=> {
// //             let actual = multiply(2,3);
// //             expect(actual).to.deep.equal([6])
// //         })

// //         it(`should muliply several numbers`,()=> {
// //             let actual = multiply(2,3,4,5,6);
// //             expect(actual).to.eql([6,8,10,12])
// //         })

// //     })

// //     context(`#async tests`, ()=> {
// //         // const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

// //         it(`should muliply several numbers with delay`, async ()=> {
// //             await delay(300);
// //             let actual = multiply(2,3,4,5,6);
// //             expect(actual).to.deep.equal([6,8,10,12])
// //         })
// //     })
// //     context(`#multiplyR tests`, ()=> {
// //         // const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

// //         it(`should randomly muliply several numbers with delay`, async ()=> {
// //             await delay(300);
// //             let actual = multiplyR(2,3,4,5,6);
// //             expect(actual.length).to.equal(5)
// //         })
// //     })

// // });
