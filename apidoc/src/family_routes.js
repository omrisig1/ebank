/**
 * @api {get} /family/:id/:details_level Request family account information
 * @apiName GetFamilyAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Family
 * @apiError family The <code>id</code> of the Account was not found.
 * @apiParam {Number} primary_id primary id of the account
 * @apiParam {string} details_level level of wanted details: ['short','full']
 * @apiSuccess {number} primary_id .
 * @apiSuccess {string} currency .
 * @apiSuccess {number} balance .
 * @apiSuccess {string} status .
 * @apiSuccess {number} address_id .
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
 *       "type": "family",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "context": "suppliers"
 *       "owners":[
 *       {
 *           "primary_id": "123",
 *           "type": "individual",
 *           "firstname": "John",
 *           "lastname": "Doe",
 *           "account_id": "1234",
 *           "currency": "USD"",
 *           "balance": 10024.3,
 *           "status": "INACTIVE",
 *           "address_id": "31",
 *           "individuel_id": "1234567",
 *           "email": "jeses.c@gmail.com"
 *          }
 *        ]
 *     }
 */

/**
 * @api {post} /family/ create family account information
 * @apiName CreateFamilyAccount
 * @apiVersion 1.0.0
 * @apiGroup Family
 * @apiError Family Error creating account for Family.

 * @apiParam {string} currency .
 * @apiParam {number} balance .
 * @apiParam {string} status .
 * @apiParam {number} address_id .
 * @apiParam {string} context .
 * @apiParam {object} owners tuple list of owners and how much each first deposit ['1234567',100].
 * 
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
 * @api {post} /family/change-status/:id Change Account Status
 * @apiName ChangeAccountStatus
 * @apiVersion 1.0.0
 * @apiGroup Buisness
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
 * @api {post} /family/transfer/same-currency Trasnfer to Buisness with same currency
 * @apiName TrasnferSameCurrencyFamily
 * @apiVersion 1.0.0
 * @apiGroup Family
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
 * @api {post} /family/close/:id Close Account 
 * @apiName CloseAccount 
 * @apiVersion 1.0.0
 * @apiGroup Family
 * @apiParam {string} ids primary id to close
 * @apiSuccess {String} status status of the response.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":"success",
 *     "message":"account closed"
 */

 /**
 * @api {post} family/:family_id/:details_level add individual to family
 * @apiName AdsIndividualToFamily
 * @apiVersion 1.0.0
 * @apiGroup Family
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