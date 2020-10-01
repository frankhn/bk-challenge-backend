import { Joi, celebrate } from 'celebrate'
const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export const createOne = celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().min(1).required()
    }),
    body: Joi.object().keys({
        email: Joi
            .string()
            .email()
            .regex(validateEmail)
            .trim()
            .label("Email")
            .lowercase()
            .messages({
                "string.any": "Must be a valid email",
            }),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        bithdate: Joi.string().required(),
        age: Joi.number().min(18).integer().required(),
        gender: Joi.string().valid('male', 'female').required().lowercase(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        cv: Joi.string().required()
    })
})
