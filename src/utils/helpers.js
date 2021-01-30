const Joi = require("joi");

const reqSchema = Joi.object()
	.keys({
		rule: Joi.object({
			field: Joi.string().required().messages({
				"string.base": `field should be a string.`,
				"string.empty": `field is required.`,
				"any.required": `field is required.`,
			}),
			condition: Joi.string().valid('eq', 'neq', 'gt', 'gte', 'contains').required().messages({
				"string.base": `condition should be a string.`,
				"string.empty": `condition is required.`,
				"any.required": `condition is required.`,
				"any.only": `condition should be value of eq or neq or gt or gte or contains.`,
			}),
			condition_value: Joi.any().required().messages({
				"any.base": `condition_rule should be a string.`,
				"any.empty": `condition_rule is required.`,
				"any.required": `condition_rule is required.`,
			}),
		})
			.required()
			.messages({
				"object.base": `rule should be an object.`,
				"any.required": `rule is a required.`,
			}),
		data: Joi
			.alternatives()
			.try(Joi.object(), Joi.array(), Joi.string())
			.required()
			.messages({
				"alternatives.types": `data should be an object or array or string.`,
				"any.required": `data is a required.`,
			}),
	})

const ValidationChecker = (data, schema) => {
    const errors = schema.validate(data);

    if (errors.error) {
        return errors.error.details[0].message;
    }

    return null
};

module.exports = { ValidationChecker, reqSchema };
