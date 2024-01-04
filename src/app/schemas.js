import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    password2: Joi.string().min(8).required(),
    email: Joi.string().email().required()
})

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})
