import express from "express";
import { userToken } from "../../middleware/auth.js";
import { fakeCode } from "../../middleware/fakeCode.js";
import { validatioin } from "../../middleware/validation.js";
import { signinSchema, signupSchema } from "./user.valedateSchema.js";
import * as userControler from "./users.controler.js";

const userRoute = express.Router();

userRoute.post("/signup", validatioin(signupSchema), userControler.signUp);
userRoute.post("/signin", validatioin(signinSchema), userControler.signIn);
userRoute.put("/update", userToken, userControler.updateUser);
userRoute.delete("/delete", userToken, userControler.deleteUser);
userRoute.get("/getuserdata", userToken, userControler.getUserData);
userRoute.get("/verify/:token", userControler.verifyEmail);
userRoute.post(
  "/resetpassword/request",
  fakeCode,
  userControler.resetPasswordRequset
);
userRoute.put(
  "/resetpassword/config",
  fakeCode,
  userControler.resetPasswordConfig
);
userRoute.put("/softdelete", userToken, userControler.softDelete);

export default userRoute;
