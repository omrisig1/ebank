/**
 * @api {get} /individual/:id 1. Get individual account information
 * @apiName GetIndividualAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Individual Account
 * @apiError Individual Failed to access individual account with id: 123.
 * @apiParam {number} id The individual account primaryID.
 * @apiSuccess {number} status Response Status Code.
 * @apiSuccess {string} message Response Message.
 * @apiSuccess {number} account_id Primary ID of the individual account.
 * @apiSuccess {string} currency Currency of the individual account.
 * @apiSuccess {number} balance Balance of the individual account.
 * @apiSuccess {string} status Status id of the individual account.
 * @apiSuccess {datetime} a_date Date of creation of the individual account.
 * @apiSuccess {datetime} e_date Date of update of the individual account.
 * @apiSuccess {number} individual_id Individual id of the individual account.
 * @apiSuccess {string} first_name First name of the individual account.
 * @apiSuccess {string} last_name Last name of the individual account.
 * @apiSuccess {string} email Email of the individual account.
 * @apiSuccess {address} address Address model of the individual account.
 * @apiSuccess {string} country_name Country name of the individual account.
 * @apiSuccess {string} country_code Country code of the individual account.
 * @apiSuccess {string} postal_code Postal code code of the individual account.
 * @apiSuccess {string} city City of the individual account.
 * @apiSuccess {string} region Region of the individual account.
 * @apiSuccess {string} street_name Street name of the individual account.
 * @apiSuccess {string} street_number Street number of the individual account.


 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "status": 400,
 *          "message": "Failed to access individual account with id: 123."
 *      }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": 200,
 *         "message": "Individual account found",
 *          "data": {
 *              "account_id": 12,
 *              "currency": "USD",
 *              "balance": 10000,
 *              "status_id": 1,
 *              "a_date": "2022-02-07T19:56:02.000Z",
 *              "e_date": "2022-02-07T19:56:02.000Z",
 *              "individual_id": 2345645,
 *              "first_name": "John",
 *              "last_name": "Doe",
 *              "email": johndoe@gmail.com,
 *              "address": {
 *                  "country_name": "Israel",
 *                  "country_code": "1234",
 *                  "postal_code": "233",
 *                  "city": "Tel-Aviv",
 *                  "region": "Center",
 *                  "street_name": "Hashalom",
 *                  "street_number": "154"
 *              }
 *          }
 *      }
 */

/**
 * @api {post} /individual/ 2. create individual account information
 * @apiName CreateIndividualAccount
 * @apiVersion 1.0.0
 * @apiGroup Individual Account
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
 * @api {post} /individual/change-status/:id 3. Change Account Status
 * @apiName ChangeAccountStatus
 * @apiVersion 1.0.0
 * @apiGroup Individual Account
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
