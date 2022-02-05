/**
 * @api {post} /individual/ create individual account information
 * @apiName CreateIndividualAccount
 * @apiVersion 1.0.0
 * @apiGroup Individual
 * @apiError Individual Error creating account for Individual.
 * @apiParam {Number} id Account unique ID3.
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
 *       "id": "1234567",
 *     }
 */
