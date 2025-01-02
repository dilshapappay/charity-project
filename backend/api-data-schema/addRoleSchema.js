const Joi = require('joi');

const roleSchema = Joi.object({
    RoleName: Joi.string().required(),
});


exports.roleSchema = roleSchema;