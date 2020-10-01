import { celebrate, Joi } from "celebrate";
const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export const register = celebrate({
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
        address: Joi.string().required()
    })
})

export const login = celebrate({
    body: Joi.object().keys({
        email: Joi
            .string()
            .email()
            .required()
            .regex(validateEmail)
            .trim()
            .label("Email")
            .lowercase()
            .messages({
                "string.required": "Email is requred",
                "string.empty": "Email is requred",
            }),
        password: Joi
            .string()
            .required()
            .trim()
            .exist()
            .messages({
                "string.empty": "Password is required",
                "string.pattern.base": "Password should be at least 6 characters 1 uppercase, 2 lowercase, a special case and 2 digits",
                "any.required": "Password is required"
            })
    })
})