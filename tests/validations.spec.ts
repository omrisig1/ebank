// import { expect } from "chai";
// import * as V from "../src/validations/validator";

// describe('The validations module',  ()=> {

//     context(`#isPositive`,()=> {
//         it(`should exist`,()=> {
//             expect(V.isPositive).to.be.a('function')
//             expect(V.isPositive).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isPositive('2');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.isPositive('-1');
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('amount should be positive')
//             }
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.isPositive('0');
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('amount should be positive')
//             }
//         })

//     })

//     context(`#inFamily`,()=> {
//         it(`should exist`,()=> {
//             expect(V.inFamily).to.be.a('function')
//             expect(V.inFamily).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.inFamily(['1','2','3'],3);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.inFamily(['1','2','3'],3);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.inFamily(['1','2','3'],4);
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account not part of family')
//             }
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.inFamily(['1','2','3'],'4');
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account not part of family')
//             }
//         })
//     })

//     context(`#accountActive`,()=> {
//         it(`should exist`,()=> {
//             expect(V.accountActive).to.be.a('function')
//             expect(V.accountActive).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             try{
//                 V.accountActive(1);
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account is not active')
//             }
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.accountActive(true);
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account is not active')
//             }
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.accountActive(2);
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account is not active')
//             }
//         })
//         it(`should throw`,()=> {
//             try{
//                 V.accountActive(false);
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account is not active')
//             }
//         })
//     })

   
//     context(`#isExists`,()=> {
//         it(`should exist`,()=> {
//             expect(V.isExists).to.be.a('function')
//             expect(V.isExists).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isExists(1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isExists(1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.isExists('1');
//             expect(actual).to.equal(true)
//         })
//         // it(`should be true`,()=> {
//         //     let actual = V.isExists(0);
//         //     expect(actual).to.equal(true)
//         // })
//         it(`should throw`,()=> {
//             try{
//                 V.isExists('');
//             }
//             catch(err){
//                 expect((err as any).message).to.equal('account does not exists')
//             }
//         })
//     })

//     context(`#NumberEquals`,()=> {
//         it(`should exist`,()=> {
//             expect(V.NumberEquals).to.be.a('function')
//             expect(V.NumberEquals).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberEquals(1,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberEquals('1','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberEquals('1',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberEquals('1',2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.NumberEquals(1,2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.NumberEquals('1','2');
//             expect(actual).to.equal(true)
//         })
//     })
    
//     context(`#NumberGreaterThan`,()=> {
//         it(`should exist`,()=> {
//             expect(V.NumberGreaterThan).to.be.a('function')
//             expect(V.NumberGreaterThan).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberGreaterThan(2,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberGreaterThan('2','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberGreaterThan('2',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberGreaterThan(1,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberGreaterThan('1','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberGreaterThan('1',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.NumberGreaterThan(1,2);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.NumberGreaterThan('1','2');
//             expect(actual).to.equal(true)
//         })
//         it(`should be throw`,()=> {
//             let actual = V.NumberGreaterThan('1',2);
//             expect(actual).to.equal(true)
//         })
//     })
        
//     context(`#NumberLessThan`,()=> {
//         it(`should exist`,()=> {
//             expect(V.NumberLessThan).to.be.a('function')
//             expect(V.NumberLessThan).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberLessThan(1,2);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberLessThan('1','2');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberLessThan('1',2);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberLessThan(1,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberLessThan('1','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be true`,()=> {
//             let actual = V.NumberLessThan('1',1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.NumberLessThan(2,1);
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.NumberLessThan('2','1');
//             expect(actual).to.equal(true)
//         })
//         it(`should be throw`,()=> {
//             let actual = V.NumberLessThan('2',1);
//             expect(actual).to.equal(true)
//         })
//     })

//     context(`#stringNotEmpty`,()=> {
//         it(`should exist`,()=> {
//             expect(V.stringNotEmpty).to.be.a('function')
//             expect(V.stringNotEmpty).to.be.instanceOf(Function)
//         })
//         it(`should be true`,()=> {
//             let actual = V.stringNotEmpty('');
//             expect(actual).to.equal(true)
//         })
//         it(`should throw`,()=> {
//             let actual = V.stringNotEmpty('NOT_EMPTY');
//             expect(actual).to.equal(true)
//         })
    
//     })

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
