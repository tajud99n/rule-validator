/**
 * http_responder object.
 * to manage response for all incoming request
 * 
 */

const http_responder = {
	async sendResponse(res, data = null, message, status, statusCode) {
		return res.status(statusCode).send({
			message,
			status,
			data,
		});
	},
};

module.exports = { http_responder };