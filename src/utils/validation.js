import Joi from 'joi'


export const REGISTER_INPUT = Joi.object({
    body: Joi.object({
        fullName: Joi.string().min(2).max(255).required(),
        userName: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(12).pattern(/^9989[012345789][0-9]{7}$/)
    })
})

export const LOGIN_INPUT = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
})


export const RESET_PASS_INPUT = Joi.object({
    body: Joi.object({
        password: Joi.string().min(6).max(255).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required()
    })
})