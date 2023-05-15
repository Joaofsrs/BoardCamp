import joi from "joi";

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.number().integer().alphanum().min(10).max(11).required(),
    cpf: joi.number().integer().min(11).max(11).required(),
    birthday: joi.date().required()
})