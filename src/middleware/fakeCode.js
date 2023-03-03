export const fakeCode = (req, res, next) => {
  const code = "1234";
  req.code = code;
  next();
};
