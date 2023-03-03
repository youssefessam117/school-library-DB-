import express from "express";
import * as dotenv from "dotenv";
import dbConnections from "./dataBase/dbConections.js";
import userRoute from "./src/modules/users/users.route.js";

dotenv.config();

dbConnections();
const app = express();

app.use(express.json());
app.use("/user", userRoute);

app.listen(3000, () => console.log("server is runnig "));
