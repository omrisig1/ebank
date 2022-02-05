/**
 * @api {get} /individual/:id Request individual account information
 * @apiName GetIndividualAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Individual
 * @apiError Individual The <code>id</code> of the Account was not found.
 * @apiParam {Number} id Account unique ID3.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Not Found"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "type": "INDIVIDUAL",
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */

/**
 * @api {get} /buisness/:id Request buisness account information
 * @apiName GetBuisnessAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Buisness
 * @apiError Buisness_ID_Not_Found The <code>id</code> of the Account was not found.
 * @apiParam {Number} id Account unique ID2.
 * @apiSuccess {String} company_name company name of the account.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Account Not Found"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "type": "BUISNESS",
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */

/**
 * @api {post} /individual/ Create Individual Account
 * @apiName CreateIndividualAccount
 * @apiVersion 1.0.0
 * @apiGroup Individual
 * @apiParam {Number} id Account unique ID2.
 * @apiSuccess {String} company_name company name of the account.
 */

/**
 * @api {post} /family/ Create Family Account
 * @apiName CreateFamilyAccount
 * @apiVersion 1.0.0
 * @apiGroup Family
 * @apiParam {Number} id Account unique ID2.
 * @apiSuccess {String} company_name company name of the account.
 */
