const Joi = require('joi');

const orderSchema = Joi.object({
    RequirementId: Joi.number().required(),
    UserId: Joi.number().required(),
    Quantity: Joi.number().required(),
    

})


exports.orderSchema = orderSchema;