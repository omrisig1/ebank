/**
 * @api {get} /individual/:id Request individual account information
 * @apiName GetIndividualAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Individual
 * @apiError Individual The <code>id</code> of the Account was not found.
 * @apiParam {Number} id Account unique ID3.
 * @apiSuccess {number} primary_id Primary ID of the User.
 * @apiSuccess {string} type Primary ID of the User.
 * @apiSuccess {string} first_name Primary ID of the User.
 * @apiSuccess {string} last_name Primary ID of the User.
 * @apiSuccess {number} account_id Primary ID of the User.
 * @apiSuccess {string} currency Primary ID of the User.
 * @apiSuccess {number} balance Primary ID of the User.
 * @apiSuccess {string} status Primary ID of the User.
 * @apiSuccess {number} address_id Primary ID of the User.
 * @apiSuccess {number} individuel_id Primary ID of the User.
 * @apiSuccess {string} email Primary ID of the User.

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Not Found"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "primary_id": "123",
 *       "type": "individual",
 *       "firstname": "John",
 *       "lastname": "Doe",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "individuel_id": "1234567",
 *       "email": "jeses.c@gmail.com"
 *     }
 */

/**
 * @api {post} /individual/ create individual account information
 * @apiName CreateIndividualAccount
 * @apiVersion 1.0.0
 * @apiGroup Individual
 * @apiError Individual Error creating account for Individual.

 * @apiParam {string} type Primary ID of the User.
 * @apiParam {string} first_name Primary ID of the User.
 * @apiParam {string} last_name Primary ID of the User.
 * @apiParam {number} account_id Primary ID of the User.
 * @apiParam {string} currency Primary ID of the User.
 * @apiParam {number} balance Primary ID of the User.
 * @apiParam {string} status Primary ID of the User.
 * @apiParam {number} address_id Primary ID of the User.
 * @apiParam {number} individuel_id Primary ID of the User.
 * @apiParam {string} email Primary ID of the User.

 * @apiSuccess {number} primary_id Primary ID of the User.
 * @apiSuccess {string} type Primary ID of the User.
 * @apiSuccess {string} first_name Primary ID of the User.
 * @apiSuccess {string} last_name Primary ID of the User.
 * @apiSuccess {number} account_id Primary ID of the User.
 * @apiSuccess {string} currency Primary ID of the User.
 * @apiSuccess {number} balance Primary ID of the User.
 * @apiSuccess {string} status Primary ID of the User.
 * @apiSuccess {number} address_id Primary ID of the User.
 * @apiSuccess {number} individuel_id Primary ID of the User.
 * @apiSuccess {string} email Primary ID of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 *       "firstname": "John",
 *       "lastname": "Doe",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "ACTIVE",
 *       "address_id": "31",
 *       "individuel_id": "1234567",
 *       "email": "jeses.c@gmail.com"
 *     }
 */

/**
 * @api {post} /individual/change-status/:id Change Account Status
 * @apiName ChangeAccountStatus
 * @apiVersion 1.0.0
 * @apiGroup Individual
 * @apiParam {string} new_status new status.
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
 *       "firstname": "John",
 *       "lastname": "Doe",
 *       "account_id": "1234",
 *       "currency": "USD"",
 *       "balance": 10024.3,
 *       "status": "INACTIVE",
 *       "address_id": "31",
 *       "individuel_id": "1234567",
 *       "email": "jeses.c@gmail.com"
 *     }]
 */
