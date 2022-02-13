// import IAccount from "../src/modules/account.model.js";
// import { IBusinessAccount } from "../src/modules/business/business.model.js";
// // import { IFamilyAccount } from "../src/modules/family/family.model.js";
// import { IIndividualAccount } from "../src/modules/individual/individual.model.js";

// export function generateGenericAccountUSD () :IAccount{
//     const acc : IAccount = {
//         account_id: 1,
//         currency: "USD",
//         balance: 100,
//         status_id: 1
//     }
//     return acc;
// }
// export function generateGenericAccountEUR () :IAccount{
//     const acc : IAccount = {
//         account_id: 2,
//         currency: "USD",
//         balance: 100,
//         status_id: 1
//     }
//     return acc;
// }
// export function generateGenericAccountBlanace0 () :IAccount{
//     const acc : IAccount = {
//         account_id: 3,
//         currency: "USD",
//         balance: 0,
//         status_id: 1
//     }
//     return acc;
// }

// export function generateIndividuals1 () :IIndividualAccount{
//     const indi : IIndividualAccount = {
//         account_id: 4,
//         currency: "USD",
//         balance: 100000,
//         individual_id: 1234567,
//         first_name: "a",
//         last_name: "a",
//         email: "a@a.com",
//         address_id: 1,
//         status_id :1
//     }
//     return indi;
// }
// export function generateIndividuals2 () :IIndividualAccount{
//     const indi : IIndividualAccount = {
//         account_id: 5,
//         currency: "USD",
//         balance: 100000,
//         individual_id: 1234567,
//         first_name: "b",
//         last_name: "b",
//         email: "a@a.com",
//         address_id: 1,
//         status_id :1
//     }
//     return indi;
// }
// export function generateIndividuals3 () :IIndividualAccount{
//     const indi : IIndividualAccount = {
//         account_id: 6,
//         currency: "USD",
//         balance: 100000,
//         individual_id: 1234567,
//         first_name: "c",
//         last_name: "c",
//         email: "a@a.com",
//         address_id: 1,
//         status_id :1
//     }
//     return indi;
// }
// export function generateIndividualsStatus0 () :IIndividualAccount{
//     const indi : IIndividualAccount = {
//         account_id: 7,
//         status_id : 0,
//         currency: "USD",
//         balance: 100,
//         individual_id: 1234567,
//         first_name: "a",
//         last_name: "a",
//         email: "a@a.com",
//         address_id: 1
//     }
//     return indi;
// }
// export function generateBuisness1 () :IBusinessAccount{
//     const buis : IBusinessAccount = {
//         account_id: 8,
//         status_id : 1,
//         currency: "USD",
//         balance: 1000000,
//         company_id:12345678,
//         company_name:"a",
//         address_id: 1
//     }
//     return buis;
// }
// export function generateBuisness2 () :IBusinessAccount{
//     const buis : IBusinessAccount = {
//         account_id: 9,
//         status_id : 1,
//         currency: "USD",
//         balance: 1000000,
//         company_id:12345678,
//         company_name:"b",
//         address_id: 1
//     }
//     return buis;
// }
// export function generateBuisness3 () :IBusinessAccount{
//     const buis : IBusinessAccount = {
//         account_id: 10,
//         status_id : 1,
//         currency: "USD",
//         balance: 1000000,
//         company_id:12345678,
//         company_name:"c",
//         address_id: 1
//     }
//     return buis;
// }
// export function generateBuisnessEUR () :IBusinessAccount{
//     const buis : IBusinessAccount = {
//         account_id: 11,
//         status_id : 1,
//         currency: "EUR",
//         balance: 1000000,
//         company_id:12345678,
//         company_name:"c",
//         address_id: 1
//     }
//     return buis;
// }
// export function generateBuisnessEURDifrrentcompany () :IBusinessAccount{
//     const buis : IBusinessAccount = {
//         account_id: 12,
//         status_id : 1,
//         currency: "EUR",
//         balance: 1000000,
//         company_id:12345679,
//         company_name:"c",
//         address_id: 1
//     }
//     return buis;
// }
// export function generateBuisnessEURSamecompany () :IBusinessAccount{
//     const buis : IBusinessAccount = {
//         account_id: 13,
//         status_id : 1,
//         currency: "EUR",
//         balance: 1000000,
//         company_id:12345678,
//         company_name:"d",
//         address_id: 1
//     }
//     return buis;
// }
// // export function generateEmptyFamilyAccount () :IFamilyAccount{
// //     const acc : IFamilyAccount = {
// //         account_id: 14,
// //         currency: "USD",
// //         balance: 1000000,
// //         status_id: 1,
// //         owners: [],
// //         context
// //     }
// //     return acc;
// // }

// // export function generateFamilyAccount () :IFamilyAccount{
// //     const acc : IFamilyAccount = {
// //         account_id: 15,
// //         currency: "USD",
// //         balance: 1000000,
// //         status_id: 1,
// //         owners: [1],
// //         context
// //     }
// //     return acc;
// // }

// // export function generateFamilyAccount () :IFamilyAccount{
// //     const acc : IFamilyAccount = {
// //         account_id: 16,
// //         currency: "USD",
// //         balance: 1000000,
// //         status_id: 1,
// //         owners: [1,2],
// //         context
// //     }
// //     return acc;
// // }