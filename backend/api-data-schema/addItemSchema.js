const Joi = require('joi');

const itemSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
});


exports.itemSchema = itemSchema;