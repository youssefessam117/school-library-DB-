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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userBooks: {
      type: [mongoose.Types.ObjectId],
      ref: "book",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
