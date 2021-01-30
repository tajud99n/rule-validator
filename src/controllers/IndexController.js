const { logger } = require("../config/logger");
const { config } = require("../config/config");
const { http_responder } = require("../utils/http_response");
const { ValidationChecker, reqSchema } = require("../utils/helpers");

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
		return http_responder.sendResponse(
			res,
			data,
			"My Rule-Validation API",
			"success",
			200
		);
	} catch (error) {
		logger.error(error);
		return http_responder.sendResponse(
			res,
			null,
			"internal server error.",
			"error",
			500
		);
	}
}

/**
 * ruleValidator
 * @desc validate data fields against rule
 * Route: POST: '/validate-rule'
 * @param {Object} req request object
 * @param {Object} res response object
 * @returns {void|Object} object
 */
async function ruleValidator(req, res) {
	try {
		
		const e = ValidationChecker(req.body, reqSchema);
		
		if (e) {
			return http_responder.sendResponse(
				res,
				null,
				e,
				"error",
				400
			);
		}

		const fieldArray = req.body.rule.field.split('.')
		if (fieldArray.length > 2) {
			return http_responder.sendResponse(
				res,
				null,
				"field nesting cannot be more than 2 levels.",
				"error",
				400
			);
		}
		let value = req.body.data
		if (!value.length) {
			value = value[fieldArray[0]];

			if (fieldArray.length == 2 && req.body.rule.condition == "contains") {
				value = value[fieldArray[1]];
			}
		}

		const validation = {
			error: false,
			field: req.body.rule.field,
			field_value: value,
			condition: req.body.rule.condition,
			condition_value: req.body.rule.condition_value,
		};
		switch (req.body.rule.condition) {
			case "eq":
				if (value === req.body.rule.condition_value) {
					return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} successfully validated.`, "success", 200);
				}
				validation.error = true;
				return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} failed validation.`, "error", 400);

			case "neq":
				if (value !== req.body.rule.condition_value) {
					return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} successfully validated.`, "success", 200);
				}
				validation.error = true;
				return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} failed validation.`, "error", 400);
			case "gt":
				if (value > req.body.rule.condition_value) {
					return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} successfully validated.`, "success", 200);
				}
				validation.error = true;
				return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} failed validation.`, "error", 400);
			case "gte":
				if (value >= req.body.rule.condition_value) {
					return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} successfully validated.`, "success", 200);
				}
				validation.error = true;
				return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} failed validation.`, "error", 400);
			case "contains":
				if (value[req.body.rule.condition_value]) {
					return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} successfully validated.`, "success", 200);
				}
				validation.error = true;
				return http_responder.sendResponse(res, {validation}, `field ${req.body.rule.field} failed validation.`, "error", 400);
		}
		
		return http_responder.sendResponse(res, "message", e, "success", 200);
	} catch (error) {
		logger.error(error);
		return http_responder.sendResponse(
			res,
			null,
			"internal server error.",
			"error",
			500
		);
	}
}


module.exports = { getUser, ruleValidator };
