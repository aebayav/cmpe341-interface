import OracleDB from "oracledb";
import { initDbPool} from "../database/database.js";
import express from "express"
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";

export const getAllCars = tryCatchWrapper( async function(req, res) {
    let connection = await OracleDB.getConnection();
    let query = "SELECT * FROM car";
    let result = await connection.execute(query);
    const rows = result.rows;
    if(!rows.length){
        return res.status(204).json({message: "Table is empty"});
    }
    
    connection.close();
    return res.status(200).json({employees: rows});
});

export const getAvailableCars = tryCatchWrapper(async function (req, res) {
    const {start_date, end_date} = req.body;
    let query = `SELECT carid FROM Cars 
    WHERE date1 >= TO_DATE(${start_date}, "DD-MM-YYYY"),
        AND date2 <= TO_DATE(${end_date},"DD-MM-YYYY");`
    let connection = await OracleDB.getConnection();
    let result = await connection.execute(query)
    let rows = result.rows;
    connection.close();
    return res.status(201).json({availableCars: `${rows}`});
})

export const addNewRent = tryCatchWrapper(async function (req,res){
    const {carid, start_date, end_date} = req.params;
    let query =  `UPDATE Car 
    SET start_date = :start_date, end_date = :end_date,
    WHERE carid = :carid`
    
    let connection = await OracleDB.getConnection();
    connection.execute(query, {start_date: start_date,
        end_date: end_date,
        carid: carid});
    connection.close();
    return res.status(204).json({message:"Entity altered successfuly"})
})

