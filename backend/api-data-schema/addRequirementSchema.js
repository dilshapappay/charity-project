const Joi = require('joi');

const requirementSchema = Joi.object({
    ItemId: Joi.number().required(),
    CampId: Joi.number().required(),
    RequiredQuantity: Joi.number().required(),
    AchievedQuantity: Joi.number().required(),
});


exports.requirementSchema = requirementSchema;