import express from "express";
import cors from "cors"; 
import catchError from "./configs/middlewares/catchError.js";

const app = express();

const port = process.env.server_port || 3000; 

app.use(express.json());
app.use(cors());
app.use(catchError);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
