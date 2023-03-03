export const validatioin = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.json(error.details);
    } else {
      next();
    }
  };
};
