import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    age: String,
    password: String,
    status: {
      type: String,
      enum: ["Active", "notActive"],
      default: "Active",
    },
    emailStatus: {
      type: String,
      enum: ["verified", "not verified"],
      default: "not verified",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
