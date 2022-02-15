/**
 * @api {post} /change-status/ 1.Change Account Status
  * @apiHeader {String} access-key Users unique access-key.
 * @apiHeader {String} req_hash hash of the request according to predetermined rules
 * @apiHeader {String} idempotency_key 
 * @apiHeader {String} salt  random generated string
 * @apiName ChangeAccountStatus
 * @apiVersion 1.0.0
 * @apiGroup Account
 * @apiParam {string} new_status new_status.
 * @apiParam {string[][]} ids tuples of id and type of the account to change status for. i.e ([["1234567","INDIVIDUAL"]...])
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
 *       "black_list" : "false",
 *       "e_date" : "2022-02-12T11:08:05.000Z",
 *       "a_date" : "2022-02-12T11:08:05.000Z"
 *     }
 * ]
 */
