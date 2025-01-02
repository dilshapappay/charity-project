const Joi = require('joi');

const volunteerSchema = Joi.object({
    UserId: Joi.number().required(),
    CampId: Joi.number().required(),

});


exports.volunteerSchema = volunteerSchema;