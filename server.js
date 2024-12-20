import express from "express";
import cors from "cors"; 
import catchError from "./configs/middlewares/catchError.js";
import OracleDB from "oracledb";
import testCon from "./configs/database/dbConnectionTest.js";
import { initDbPool,getPool } from "./configs/database/database.js";

const app = express();
const port = process.env.server_port || 3000; 
const dbUser = process.env.db_user;
const dbPass = process.env.db_pass;
const conString = process.env.conString;

app.use(express.json());
app.use(cors());
app.use(catchError);
app.use(testCon);

app.listen(port, () => {

    initDbPool(dbUser,dbPass,conString);
    console.log(`app listening on port ${port}`);
    
});
