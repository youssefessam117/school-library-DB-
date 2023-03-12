import express from "express";
import { userToken } from "../../middleware/auth.js";
import { validatioin } from "../../middleware/validation.js";
import { uploadFile } from "../../utilities/photos upload/upload.js";
import * as bookControler from "./book.controler.js";
import { addbookvalidation } from "./book.validate.js";

const bookRoute = express.Router();

bookRoute.post(
  "/add",
  userToken,
  uploadFile("book photo"),
  validatioin(addbookvalidation),
  bookControler.addBook
);
bookRoute.patch("/borrow", userToken, bookControler.borrowBook);
bookRoute.patch("/calculatingFine", bookControler.calculatingFine);
bookRoute.patch("/returnBook", bookControler.returnBook);
bookRoute.get("/getAllBooks", userToken, bookControler.getAllBooks);
bookRoute.get("/getBorrowedBooks", userToken, bookControler.getBorrowedBooks);
bookRoute.get("/search", userToken, bookControler.search);

export default bookRoute;
