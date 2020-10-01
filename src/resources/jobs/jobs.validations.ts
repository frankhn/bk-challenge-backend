import { Joi, celebrate } from 'celebrate'

export const createOne = celebrate({
    body: Joi.object().keys({
        title: Joi.string().min(3).max(100).required().lowercase(),
        description: Joi.string().min(20).max(500).required().lowercase()
    })
})