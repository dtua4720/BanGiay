/**
 * Generic middleware factory: validates `req.body` against a Joi schema.
 * Returns 400 with a Vietnamese-friendly combined error message on failure.
 *
 * Usage:
 *   router.post('/login', validate(loginSchema), userController.login);
 */
const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: error.details.map((detail) => detail.message).join(', '),
        });
    }

    req.body = value;
    next();
};

module.exports = validate;
