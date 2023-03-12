import bookModel from "./../../../dataBase/models/bookModel.js";
import { catchAsyncError } from "./../../utilities/asyncError.js";
import userModel from "./../../../dataBase/models/userTabls.model.js";
import { AppError } from "./../../utilities/errorClassMessage.js";
import moment from "moment";

// add book
export const addBook = catchAsyncError(async (req, res, next) => {
  const { title } = req.body;
  const user = await userModel.findById({ _id: req._id });
  if (user.role === "user") {
    return next(new AppError("Rong permission", 401));
  }
  const book = await bookModel.insertMany({ title, photo: req.file.filename });
  res.json({ message: "success" });
});

// borrow book

export const borrowBook = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  // const today = moment();
  const isExist = await bookModel.findById(_id);
  if (isExist && isExist.borrowed === false) {
    const book = await bookModel.findByIdAndUpdate(
      { _id },
      {
        borrowed: true,
        borrowingStarDate: moment(),
        borrowingEndDate: moment().add(3, "days"),
        borrowerUser: req._id,
      },
      { new: true }
    );
    const userBook = await userModel.findByIdAndUpdate(
      { _id: req._id },
      { $addToSet: { userBooks: _id } }
    );
    res.json({ message: "success", book });
  } else {
    return next(new AppError("not found or book already in use ", 404));
  }
});

// calculating fine
export const calculatingFine = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const fine = 50;
  const today = moment();
  const isExist = await bookModel.findById(_id);
  if (isExist && isExist.borrowed === true) {
    const notReturned = today.diff(isExist.borrowingEndDate, "days");
    if (notReturned > 0) {
      const book = await bookModel.findByIdAndUpdate(
        { _id },
        { notReturnedBook: true, BookFine: `${notReturned * fine}$` },
        { new: true }
      );
      res.json({ message: "book fine", book });
    } else {
      return next(new AppError("the Retutned date stil valid "), 400);
    }
  } else {
    return next(new AppError("not found or book not in use", 404));
  }
});
// return book

export const returnBook = catchAsyncError(async (req, res, next) => {
  const { _id, userId } = req.body;
  const isExist = await bookModel.findById(_id);
  if (isExist && isExist.borrowed === true) {
    const book = await bookModel.findByIdAndUpdate(
      { _id },
      {
        borrowed: false,
        notReturnedBook: false,
        $unset: {
          BookFine: 1,
          borrowingStarDate: 1,
          borrowingEndDate: 1,
        },
      },
      { new: true }
    );
    const deleteBookId = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { userBooks: _id } }
    );
    res.json({ message: "success", book });
  } else {
    return next(new AppError("not found or book not in use", 404));
  }
});
// get all books
export const getAllBooks = catchAsyncError(async (req, res, next) => {
  const books = await bookModel.find();
  res.json({ message: "success", books });
});

// get borrowed books
export const getBorrowedBooks = catchAsyncError(async (req, res, next) => {
  const user = await userModel
    .findById({ _id: req._id }, { userBooks: 1, _id: 0 })
    .populate("userBooks");

  res.json(user);
});

// // get unreturned books
// export const getunReturnedBooks = catchAsyncError(async (req, res, next) => {
//   const user = await userModel.findById(req._id);
//   const books = bookModel.findById(
//     { _id: user.userBooks },
//     { notReturnedBook: user.userBooks.notReturned === true }
//   );

//   res.json(books);
// });

// search
export const search = async (req, res, next) => {
  const { search } = req.body;
  const book = await bookModel.find({
    title: { $regex: `^${search}` },
  });
  if (book.length === 0) {
    return next(new AppError("faild", 404));
  } else {
    res.json({ message: "success", book });
  }
};
