import Joi from "joi";

export const addbookvalidation = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
});
