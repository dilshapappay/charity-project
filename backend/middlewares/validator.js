const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body,{ abortEarly: false });

    if (error) {
        return res.status(400).send(error.details.map((err) => err.message));
    }

    next();
};

exports.validate = validate;