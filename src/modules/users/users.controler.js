import userModel from "./../../../dataBase/models/userTabls.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkedPassword, hashPassword } from "../../utilities/user.hash.js";
import { sendEmail } from "../../emails/sendEmail.js";
import { htmlTemplate } from "../../emails/htmltemplate.js";
import { resetPasswordTemplate } from "../../emails/resetPasswordTemplate.js";
import { catchAsyncError } from "./../../utilities/asyncError.js";
import { AppError } from "../../utilities/errorClassMessage.js";

export const signUp = catchAsyncError(async (req, res, next) => {
  const { name, email, password, age, role } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return next(new AppError("email already exist", 405));
  } else {
    const hash = hashPassword(password);
    const hashedEmail = jwt.sign({ email }, process.env.tokenPass);
    // Store hash in your password DB.
    const user = await userModel.insertMany({
      name,
      email,
      password: hash,
      age,
      role,
    });
    res.json({ message: "success", user });
    sendEmail(email, htmlTemplate(hashedEmail));
  }
});

// signin
export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const isExist = await userModel.findOne({ email });
  //   const { _id, name, email } = isExist;
  if (isExist) {
    const matchPassword = checkedPassword(password, isExist.password);
    if (matchPassword && isExist.emailStatus === "verified") {
      var token = jwt.sign(
        {
          name: isExist.name,
          _id: isExist._id,
          email,
          createdAt: isExist.createdAt,
          status: isExist.status,
          role: isExist.role,
        },
        process.env.tokenPass
      );
      res.json({ message: `success`, token });
    } else {
      return next(
        new AppError(
          "email or password are wrong dont forget to verify email",
          401
        )
      );
    }
  } else {
    return next(
      new AppError(
        "email or password are wrong dont forget to verify email",
        401
      )
    );
  }
});
// update user
export const updateUser = async (req, res, next) => {
  const { name, email, age } = req.body;
  const update = await userModel.findByIdAndUpdate(
    { _id: req._id },
    { email, age, name },
    { new: true }
  );
  res.json({ message: "success", update });
};
// deleteUser
export const deleteUser = async (req, res) => {
  const deleted = await userModel.deleteOne({ _id: req._id });
  res.json({ message: "success", deleted });
};

// // get user data

export const getUserData = async (req, res, next) => {
  const user = await userModel.findById({ _id: req._id });
  user.password = undefined;
  res.json(user);
};

// verify email
export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  jwt.verify(token, process.env.tokenPass, async (err, decoded) => {
    if (!err) {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { emailStatus: "verified" }
      );
      res.json({ message: "success" });
    } else {
      res.json(err);
    }
  });
};

// forgot password
export const resetPasswordRequset = async (req, res, next) => {
  const { email } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    sendEmail(email, resetPasswordTemplate(req.code));
    res.json({ message: "success" });
  } else {
    res.json({ message: "wrong email" });
  }
};

export const resetPasswordConfig = async (req, res, next) => {
  const { code, newPassword, email } = req.body;
  const hash = hashPassword(newPassword);
  if (req.code == code) {
    await userModel.findOneAndUpdate({ email }, { password: hash });
    res.json({ message: "success" });
  } else {
    res.json({ message: "wrong code" });
  }
};

// soft delete
export const softDelete = async (req, res, next) => {
  const deletedUSer = await userModel.findByIdAndUpdate(
    { _id: req._id },
    { status: "notActive" },
    { new: true }
  );
  res.json({ message: "success", deletedUSer });
};
