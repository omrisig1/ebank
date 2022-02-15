/**
 * @api {get} /family/:id/:details_level 1.Request family account information
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName GetFamilyAccountInformation
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiError family The <code>id</code> of the Account was not found.
 * @apiParam {Number} id primary id of the account
 * @apiParam {string= ['short','full']} details_level level of wanted details: 
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
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName CreateFamilyAccount
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiError Family Error creating account for Family.

 * @apiParam {string=["USD","EUR","AUD","CAD","JPY","CHF","CNY","GBP"]} currency .
 * @apiParam {number} [balance=0] .
 * @apiParam {number} [address=null] .
 * @apiParam {string} [context=null] .
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
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName TrasnferSameCurrencyFamily
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {number} source source account primary id.
 * @apiParam {number} destination destination account primary id.
 * @apiParam {number} amount amount to transfer.
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {string} message action outcome.
 * @apiSuccessExample {json} Success-Response:
{
    "status": 200,
    "message": "Transfer has done successfully.",
    "data": [
        {
            "account_id": 218,
            "currency": "EUR",
            "balance": 22000,
            "status_id": 1,
            "a_date": "2022-02-12T10:13:41.000Z",
            "e_date": "2022-02-12T12:25:54.000Z"
        },
        {
            "account_id": 223,
            "currency": "EUR",
            "balance": 902000,
            "status_id": 1,
            "a_date": "2022-02-12T12:25:49.000Z",
            "e_date": "2022-02-12T12:25:54.000Z"
        }
    ]
}
 */

 /**
 * @api {post} /family/close/:id 6.Close Account 
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName CloseAccount 
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {string} id id in the params -  primary id to close
 * @apiSuccess {String} status status of the response.
 * @apiSuccessExample {json} Success-Response:
{
    "status": 200,
    "message": "Family account has closed successfully.",
    "data": 213
}
 */

 /**
 * @api {post} family/add/:family_id/:details_level 4.add individual to family
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName AddIndividualToFamily
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {string[][]} individuals_to_add individuals to add and thier amount
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {String} message description of the response.
 * @apiSuccess {object} family with owners.
 * @apiSuccessExample {json} Success-Response:
 {
    "status": 200,
    "message": "Individuals added to family account.",
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
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName RemoveIndividualFromFamily
 * @apiVersion 1.0.0
 * @apiGroup Family Account
 * @apiParam {string} family account id to remove from 
 * @apiParam {string=['short','full']} details_level reponse
 * @apiParam {string[][]} individuals_to_remove individuals to remove and thier amount
 * @apiSuccess {String} status status of the response.
 * @apiSuccess {String} message description of the response.
 * @apiSuccess {object} family with owners.
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