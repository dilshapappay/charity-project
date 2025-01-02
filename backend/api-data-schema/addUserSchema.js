const Joi = require('joi');

const userSchema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    RoleId: Joi.number().required(),
    Password: Joi.string().required(),
    Email: Joi.string().email().required(),
    Address: Joi.string().required(),
    Mobile: Joi.number().required(),

});


exports.userSchema = userSchema;