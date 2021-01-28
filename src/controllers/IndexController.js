const { logger } = require("../config/logger");
const { config } = require("../config/config");
const { http_responder } = require("../utils/http_response");

/**
 * getUser
 * @desc fetch the details of user
 * Route: GET: '/'
 * @param {Object} req request object
 * @param {Object} res response object
 * @returns {void|Object} object
 */
async function getUser(req, res) {
	try {
		const data = {
			name: config.owner.name,
			github: config.owner.github,
			email: config.owner.email,
			mobile: config.owner.mobile,
			twitter: config.owner.twitter,
        };
		return http_responder.sendResponse(res, data, "My Rule-Validation API", "success", 200);
	} catch (error) {
		logger.error(JSON.stringify(error));
		return http_responder.sendResponse(res, null, "internal server error.", "error", 500);
	}
}

module.exports = {getUser}