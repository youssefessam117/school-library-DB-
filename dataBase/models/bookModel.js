import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: String,
    borrowed: {
      type: Boolean,
      default: false,
    },
    photo: String,
    borrowingStarDate: Date,
    borrowingEndDate: Date,
    notReturnedBook: {
      type: Boolean,
      default: false,
    },
    BookFine: String,
  },
  { timestamps: true }
);

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
