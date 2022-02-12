/**
 * @api {get} /buisness/:id 1.Request buisness account information
 * @apiName GetBuisnessAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiError buisness The <code>id</code> of the Account was not found.
 * @apiParam {Number} primary_id primary id of the account 
 * @apiSuccess {number} primary_id .
 * @apiSuccess {string} currency .
 * @apiSuccess {number} balance .
 * @apiSuccess {string} status .
 * @apiSuccess {number} address_id .
 * @apiSuccess {number} company_id .
 * @apiSuccess {string} company_name .
 * @apiSuccess {string} e_date .
 * @apiSuccess {string} a_date .
 * @apiSuccess {string} context .
 * @apiSuccess {string} black_list .


 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Not Found"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   "status": 200, 
 *   "message": "Buisness account Found",
 *   "data":
 *     {
 *       "primary_id": "1234567",
 *       "type": "buisness",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "company_name": "spid",
 *       "company_id": "88888888"
 *       "context": "suppliers",
 *       "black_list": 0,
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     }
 */

/**
 * @api {post} /buisness/ 2.create buisness account information
 * @apiName CreateBuisnessAccount
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiError Buisness Error creating account for Buisness.

 * @apiParam {number} primary_id .78 digit bigger than 1000000 number
 * @apiParam {string} currency . Currency of the Account
 * @apiParam {number} balance . Initial Balance Of The Account
 * @apiParam {Object} address . 
 * @apiParam {number} company_id . 8 digit bigger than 10000000 number
 * @apiParam {string} company_name . The Comapny Name
 * @apiParam {string} context . The Context Which The Account Is For.

 * @apiSuccess {number} primary_id .
 * @apiSuccess {number} account_id .
 * @apiSuccess {string} currency .
 * @apiSuccess {number} balance .
 * @apiSuccess {string} status .
 * @apiSuccess {number} address_id .
 * @apiSuccess {number} company_id .
 * @apiSuccess {string} company_name .
 * @apiSuccess {string} context .
 * @apiSuccess {string} black_list .

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Was Not Created
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   "status": 200,
 *   "message": "Business account created",
 *   "data":
 *     {
 *       "primary_id": "1234567",
 *       "type": "individual",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "company_id": "12345678",
 *       "company_name": "lego",
 *       "context": "suppliers",
 *       "black_list" : "0",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     }
 */

/**
 * @api {post} /buisness/change-status/:id 5.Change Account Status
 * @apiName ChangeAccountStatus
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiParam {string} new_status new_status.
 * @apiParam {string[]} ids ids to change status for.
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {object[]} changed objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":"Account's statuses changed.",
 *     "message":
 *     [
 *      {
 *       "primary_id": "123",
 *       "type": "individual",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address": "",
 *       "company_id": "312",
 *       "company_name": "lego",
 *       "context": "suppliers",
 *       "black_list" : "0",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     }
 * ]
 */

/**
 * @api {post} /buisness/transfer/same-currency 3.Trasnfer to Buisness/Individual with same currency
 * @apiName TrasnferSameCurrency
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiParam {number} source source account primary id.
 * @apiParam {number} destination destination account primary id.
 * @apiParam {number} amount amount to transfer.

 * @apiSuccess {String} status status of the response.
 * @apiSuccess {string} message action outcome.
 * @apiSuccess {object[]} changed objects.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":200,
 *     "message":"Transfer has done successfully",
 *      "data": [
        {
 *       "type": "buisness",
 *       "account_id": "1234567",
 *       "currency": "USD"",
 *       "balance": 1000,
 *       "status": "ACTIVE",
 *       "address": "",
 *       "company_id": "312",
 *       "company_name": "lego",
 *       "context": "suppliers",
 *       "black_list" : "0",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     },
        {
 *       "type": "buisness",
 *       "account_id": "1234568",
 *       "currency": "USD"",
 *       "balance": 3000,
 *       "status": "ACTIVE",
 *       "address": "",
 *       "company_id": "12345678",
 *       "company_name": "lego",
 *       "context": "suppliers",
 *       "black_list" : "0",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     }
    ]
 */

/**
 * @api {post} /buisness/transfer/different-currency 4.Trasnfer to Buisness with different currency
 * @apiName TrasnferDifferentCurrency
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiParam {number} source source account primary id.
 * @apiParam {number} destination destination account primary id.
 * @apiParam {number} amount amount to transfer.

 * @apiSuccess {String} status status of the response.
 * @apiSuccess {string} message action outcome.
 * @apiSuccess {object[]} changed objects.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "message":"Transfer has done successfully",
 *     "data": [
        {
 *       "type": "buisness",
 *       "account_id": "1234567",
 *       "currency": "USD"",
 *       "balance": 1000,
 *       "status": "ACTIVE",
 *       "address": "",
 *       "company_id": "312",
 *       "company_name": "lego",
 *       "context": "suppliers",
 *       "black_list" : "0",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     },
        {
 *       "type": "buisness",
 *       "account_id": "1234568",
 *       "currency": "USD"",
 *       "balance": 3000,
 *       "status": "ACTIVE",
 *       "address": "",
 *       "company_id": "12345678",
 *       "company_name": "lego",
 *       "context": "suppliers",
 *       "black_list" : "0",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     }
    ]
 */