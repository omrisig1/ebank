/**
 * @api {get} /family/:id/:details_level 1.Request family account information
 * @apiName GetFamilyAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Family Account
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
 {
    "status": 200,
    "message": "Family account found",
    "data": {
        "account_id": 218,
        "currency": "EUR",
        "balance": 24000,
        "status_id": 1,
        "a_date": "2022-02-12T10:13:41.000Z",
        "e_date": "2022-02-12T10:15:13.000Z",
        "context": null,
        "owners": [
            {
                "account_id": 212,
                "currency": "EUR",
                "balance": 811036,
                "status_id": 1,
                "a_date": "2022-02-12T09:32:13.000Z",
                "e_date": "2022-02-12T10:14:25.000Z",
                "individual_id": 1000126,
                "first_name": "omri7",
                "last_name": "Cohen",
                "email": "omri@gmail.com",
                "address": {
                    "address_id": 11,
                    "country_name": "oklslsa",
                    "country_code": null,
                    "postal_code": null,
                    "city": null,
                    "region": null,
                    "street_name": null,
                    "street_number": null,
                    "a_date": "2022-02-12T09:32:13.000Z",
                    "e_date": "2022-02-12T09:32:13.000Z"
                }
            }
        ]
    }
}
 */

/**
 * @api {post} /family/ 2.create family account information
 * @apiName CreateFamilyAccount
 * @apiVersion 1.0.0
 * @apiGroup Family Account
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
{
    "status": 200,
    "message": "Family account Created",
    "data": {
        "account_id": 218,
        "currency": "EUR",
        "balance": 24000,
        "status_id": 1,
        "a_date": "2022-02-12T10:13:41.000Z",
        "e_date": "2022-02-12T10:15:13.000Z",
        "context": null,
        "owners": [
            {
                "account_id": 212,
                "currency": "EUR",
                "balance": 811036,
                "status_id": 1,
                "a_date": "2022-02-12T09:32:13.000Z",
                "e_date": "2022-02-12T10:14:25.000Z",
                "individual_id": 1000126,
                "first_name": "omri7",
                "last_name": "Cohen",
                "email": "omri@gmail.com",
                "address": {
                    "address_id": 11,
                    "country_name": "oklslsa",
                    "country_code": null,
                    "postal_code": null,
                    "city": null,
                    "region": null,
                    "street_name": null,
                    "street_number": null,
                    "a_date": "2022-02-12T09:32:13.000Z",
                    "e_date": "2022-02-12T09:32:13.000Z"
                }
            }
        ]
    }
}
 */

/**
 * @api {post} /family/transfer 3.Trasnfer to Buisness with same currency
 * @apiName TrasnferSameCurrencyFamily
 * @apiVersion 1.0.0
 * @apiGroup Family Account
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
 * @api {post} /family/close/:id 6.Close Account 
 * @apiName CloseAccount 
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {string} ids primary id to close
 * @apiSuccess {String} status status of the response.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "status":"success",
 *     "message":"account closed"
 */

 /**
 * @api {post} family/add/:family_id/:details_level 4.add individual to family
 * @apiName AddIndividualToFamily
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {string} new_status new_status.
 * @apiParam {string[]} ids ids to change status for.
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {object[]} changed objects.
 * @apiSuccessExample {json} Success-Response:
 {
    "status": 200,
    "message": "Family account found",
    "data": {
        "account_id": 218,
        "currency": "EUR",
        "balance": 24000,
        "status_id": 1,
        "a_date": "2022-02-12T10:13:41.000Z",
        "e_date": "2022-02-12T10:15:13.000Z",
        "context": null,
        "owners": [
            {
                "account_id": 212,
                "currency": "EUR",
                "balance": 811036,
                "status_id": 1,
                "a_date": "2022-02-12T09:32:13.000Z",
                "e_date": "2022-02-12T10:14:25.000Z",
                "individual_id": 1000126,
                "first_name": "omri7",
                "last_name": "Cohen",
                "email": "omri@gmail.com",
                "address": {
                    "address_id": 11,
                    "country_name": "oklslsa",
                    "country_code": null,
                    "postal_code": null,
                    "city": null,
                    "region": null,
                    "street_name": null,
                    "street_number": null,
                    "a_date": "2022-02-12T09:32:13.000Z",
                    "e_date": "2022-02-12T09:32:13.000Z"
                }
            },
            {
                "account_id": 216,
                "currency": "EUR",
                "balance": 891009,
                "status_id": 1,
                "a_date": "2022-02-12T09:48:51.000Z",
                "e_date": "2022-02-12T10:15:13.000Z",
                "individual_id": 1000127,
                "first_name": "omri7",
                "last_name": "Cohen",
                "email": "omri@gmail.com",
                "address": {
                    "address_id": 12,
                    "country_name": "oklslsa",
                    "country_code": null,
                    "postal_code": null,
                    "city": null,
                    "region": null,
                    "street_name": null,
                    "street_number": null,
                    "a_date": "2022-02-12T09:48:51.000Z",
                    "e_date": "2022-02-12T09:48:51.000Z"
                }
            }
        ]
    }
}
 */


 /**
 * @api {post} family/remove/:family_id/:details_level 5. remove individual to family
 * @apiName RemoveIndividualFromFamily
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {string} new_status new_status.
 * @apiParam {string[]} ids ids to change status for.
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {object[]} changed objects.
 * @apiSuccessExample {json} Success-Response:
 {
    "status": 200,
    "message": "Family account found",
    "data": {
        "account_id": 218,
        "currency": "EUR",
        "balance": 24000,
        "status_id": 1,
        "a_date": "2022-02-12T10:13:41.000Z",
        "e_date": "2022-02-12T10:15:13.000Z",
        "context": null,
        "owners": [
            {
                "account_id": 212,
                "currency": "EUR",
                "balance": 811036,
                "status_id": 1,
                "a_date": "2022-02-12T09:32:13.000Z",
                "e_date": "2022-02-12T10:14:25.000Z",
                "individual_id": 1000126,
                "first_name": "omri7",
                "last_name": "Cohen",
                "email": "omri@gmail.com",
                "address": {
                    "address_id": 11,
                    "country_name": "oklslsa",
                    "country_code": null,
                    "postal_code": null,
                    "city": null,
                    "region": null,
                    "street_name": null,
                    "street_number": null,
                    "a_date": "2022-02-12T09:32:13.000Z",
                    "e_date": "2022-02-12T09:32:13.000Z"
                }
            },
            {
                "account_id": 216,
                "currency": "EUR",
                "balance": 891009,
                "status_id": 1,
                "a_date": "2022-02-12T09:48:51.000Z",
                "e_date": "2022-02-12T10:15:13.000Z",
                "individual_id": 1000127,
                "first_name": "omri7",
                "last_name": "Cohen",
                "email": "omri@gmail.com",
                "address": {
                    "address_id": 12,
                    "country_name": "oklslsa",
                    "country_code": null,
                    "postal_code": null,
                    "city": null,
                    "region": null,
                    "street_name": null,
                    "street_number": null,
                    "a_date": "2022-02-12T09:48:51.000Z",
                    "e_date": "2022-02-12T09:48:51.000Z"
                }
            }
        ]
    }
}
 */