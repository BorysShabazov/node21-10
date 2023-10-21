const Joi = require("joi");

const carSchema = Joi.object({
  title: Joi.string().required(),
  color: Joi.string(),
  price: Joi.number().required(),
  year: Joi.number(),
});

module.exports = carSchema;
