import joi from "joi";

export const postUrlSchema = joi.object({
    url: joi.string().uri().required()
})