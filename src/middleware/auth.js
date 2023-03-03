import jwt from "jsonwebtoken";

export const userToken = (req, res, next) => {
  const token = req.header("token");
  jwt.verify(token, process.env.tokenPass, (error, decoded) => {
    if (error) {
      res.json({ message: "error in token", error });
    } else {
      req._id = decoded._id;
      next();
    }
  });
};
