import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(10).required(),
    confirmPassword: joi.any().valid(joi.ref("password"))
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(10).required()
})