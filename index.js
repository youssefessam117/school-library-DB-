import express from "express";
import * as dotenv from "dotenv";
import dbConnections from "./dataBase/dbConections.js";
import userRoute from "./src/modules/users/users.route.js";
import { globalError } from "./src/middleware/globaleError.js";
import { AppError } from "./src/utilities/errorClassMessage.js";
import bookRoute from "./src/modules/books/book.route.js";

dotenv.config();

dbConnections();
const app = express();

app.use(express.json());
app.use("/user", userRoute);
app.use("/book", bookRoute);

app.all("*", (req, res, next) => {
  next(new AppError("Rong Url", 404));
});
app.use(globalError);

app.listen(3000, () => console.log("server is runnig "));
