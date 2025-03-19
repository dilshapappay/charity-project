const Joi = require('joi');

const requirementSchema = Joi.object({
    ItemId: Joi.number().required(),
    CampId: Joi.number().required(),
    RequiredQuantity: Joi.number().required(),
    AchievedQuantity: Joi.number().required(),
    ImageURL: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        buffer: Joi.binary().required(),
        size: Joi.number().required()
    }).required()});


exports.requirementSchema = requirementSchema;