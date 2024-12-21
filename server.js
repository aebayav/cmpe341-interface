import express from "express";
import cors from "cors"; 
import catchError from "./configs/middlewares/catchError.js";
import OracleDB from "oracledb";
import { initDbPool } from "./configs/database/database.js";
import { getAllCars } from "./configs/controllers/user.controllers.js";
import testCon from "./utils/dbConnectionTest.js";
import userRoute from "./configs/routes/user.routes.js"

const app = express();
const port = process.env.server_port || 3000; 
const dbUser = process.env.db_user;
const dbPass = process.env.db_pass;
const conString = process.env.conString;

app.use(express.json());
app.use(cors());
app.use(catchError);
app.use("/user", userRoute);


app.listen(port, () => {
    initDbPool(dbUser,dbPass,conString);
    console.log(`app listening on port ${port}`);
    setTimeout(getAllCars,1000)// ---> we need this delay because when we run the server code it calls getAllCars before
                              // initDbPool function but we need to call these 2 functions in reverse order
});
