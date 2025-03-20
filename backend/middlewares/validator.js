const multer = require('multer');
const upload = multer().any(); // This will parse the FormData

const validate = (schema) => [
    upload, // This will parse the FormData and populate req.body and req.files
    (req, res, next) => {
        // Combine req.body and req.files into a single object for validation
        const data = { ...req.body };
        if (req.files) {
            req.files.forEach(file => {
                data[file.fieldname] = file;
            });
        }

        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            return res.status(400).send(error.details.map((err) => err.message));
        }

        next();
    }
];

exports.validate = validate;