import Joi from "joi";

export const todoSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `Required field`,
  }),
  description: Joi.string().required().messages({
    "any.required": `Required field`,
  }),
  isDone: Joi.bool().required().messages({
    "any.required": `Required field`,
  }),
});
