const Joi = require('joi');

const campSchema = Joi.object({
    CampAdminId: Joi.number().required(),
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    LocationAddress: Joi.string().required(),
    District: Joi.string().required(),

});


exports.campSchema = campSchema;