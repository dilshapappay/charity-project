const Joi = require('joi');

const registerUserScheme = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    RoleId: Joi.number().required(),
    Password: Joi.string().required(),
    Email: Joi.string().email().required(),
    Address: Joi.string().required(),
    Mobile: Joi.number().required(),

});


exports.registerUserScheme = registerUserScheme;