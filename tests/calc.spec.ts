// import { expect } from "chai";
// import { sum, multiply, multiplyR } from "../src/calc.js";
// import { delay } from "../src/utils.js";



// describe('The calc module',  ()=> {

//     context(`#sum`,()=> {
        
//         it(`should exist`,()=> {
//             expect(sum).to.be.a('function')
//             expect(sum).to.be.instanceOf(Function)
//         })

//         it(`should sum two numbers`,()=> {
//             let actual = sum(2,3);
//             expect(actual).to.equal(5)
//         })

//         it(`should sum several numbers`,()=> {
//             let actual = sum(2,3,4,5,6);
//             expect(actual).to.equal(20)
//         })

//     })

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
//     context(`#multiply`,()=> {

//         it(`should exist`,()=> {
//             expect(sum).to.be.a('function')
//             expect(sum).to.be.instanceOf(Function)
//         })

//         it(`should multiply two numbers`,()=> {
//             let actual = multiply(2,3);
//             expect(actual).to.deep.equal([6])
//         })

//         it(`should muliply several numbers`,()=> {
//             let actual = multiply(2,3,4,5,6);
//             expect(actual).to.eql([6,8,10,12])
//         })

//     })
    
//     context(`#async tests`, ()=> {
//         // const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

//         it(`should muliply several numbers with delay`, async ()=> {
//             await delay(300);
//             let actual = multiply(2,3,4,5,6);
//             expect(actual).to.deep.equal([6,8,10,12])
//         })
//     })
//     context(`#multiplyR tests`, ()=> {
//         // const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

//         it(`should randomly muliply several numbers with delay`, async ()=> {
//             await delay(300);
//             let actual = multiplyR(2,3,4,5,6);
//             expect(actual.length).to.equal(5)
//         })
//     })


// });

