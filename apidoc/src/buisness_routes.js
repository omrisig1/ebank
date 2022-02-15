/**
 * @api {get} /buisness/:id 1.Request buisness account information
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName GetBuisnessAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiError buisness The <code>id</code> of the Account was not found.
 * @apiParam {Number} id primary id of the account 
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
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName CreateBuisnessAccount
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiError Buisness Error creating account for Buisness.

 * @apiParam {number} primary_id .78 digit bigger than 1000000 number
 * @apiParam {string = ["USD","EUR","AUD","CAD","JPY","CHF","CNY","GBP"]} currency . Currency of the Account
 * @apiParam {number} [balance = 0]  . Initial Balance Of The Account
 * @apiParam {Object} [address = null] . 
 * @apiParam {number} company_id . 8 digit bigger than 10000000 number
 * @apiParam {string} [company_name = null] . The Comapny Name
 * @apiParam {string} [context= null] . The Context Which The Account Is For.

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
 * @api {post} /buisness/transfer/same-currency 3.Trasnfer to Buisness/Individual with same currency
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
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
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
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