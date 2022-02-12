/**
 * @api {get} /buisness/:id Request buisness account information
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
 * @apiSuccess {string} context .

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Not Found"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "primary_id": "123",
 *       "type": "buisness",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "company_name": "spid",
 *       "company_id": "88888888"
 *       "context": "suppliers"
 *     }
 */

/**
 * @api {post} /buisness/ create buisness account information
 * @apiName CreateBuisnessAccount
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiError Buisness Error creating account for Buisness.

 * @apiParam {string} type Primary ID of the User.
 * @apiParam {number} primary_id .
 * @apiParam {string} currency .
 * @apiParam {number} balance .
 * @apiParam {string} status .
 * @apiParam {number} address_id .
 * @apiParam {number} company_id .
 * @apiParam {string} company_name .
 * @apiParam {string} context .

 * @apiSuccess {number} primary_id .
 * @apiSuccess {number} account_id .
 * @apiSuccess {string} currency .
 * @apiSuccess {number} balance .
 * @apiSuccess {string} status .
 * @apiSuccess {number} address_id .
 * @apiSuccess {number} company_id .
 * @apiSuccess {string} company_name .
 * @apiSuccess {string} context .
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Was Not Created
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "account created succesfuly",
 *       "primary_id": "123",
 *       "type": "individual",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "company_id": "312",
 *       "company_name": "lego",
 *       "context": "suppliers"
 *     }
 */

/**
 * @api {post} /buisness/change-status/:id Change Account Status
 * @apiName ChangeAccountStatus
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiParam {string} new_status new_status.
 * @apiParam {string[]} ids ids to change status for.
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {object[]} changed objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":"success",
 *     "message":
 *     [{
 *       "primary_id": "123",
 *       "type": "individual",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "company_id": "312",
 *       "company_name": "lego",
 *       "context": "suppliers"
 *     }]
 */

/**
 * @api {post} /buisness/transfer/same-currency Trasnfer to Buisness/Individual with same currency
 * @apiName TrasnferSameCurrency
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiParam {number} source source account primary id.
 * @apiParam {number} destination destination account primary id.
 * @apiParam {number} amount amount to transfer.

 * @apiSuccess {String} status status of the response.
 * @apiSuccess {string} message action outcome.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":"success",
 *     "message": "money transfered"
 */

/**
 * @api {post} /buisness/transfer/different-currency Trasnfer to Buisness with different currency
 * @apiName TrasnferDifferentCurrency
 * @apiVersion 1.0.0
 * @apiGroup Buisness Account
 * @apiParam {number} source source account primary id.
 * @apiParam {number} destination destination account primary id.
 * @apiParam {number} amount amount to transfer.

 * @apiSuccess {String} status status of the response.
 * @apiSuccess {string} message action outcome.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":"success",
 *     "message": "money transfered"
 */