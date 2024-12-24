import OracleDB from "oracledb";
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";
import { json } from "express";

export const getAllCars = tryCatchWrapper( async function(req, res) {
    let connection = await OracleDB.getConnection();
    let query = "SELECT * FROM cars";
    let result = await connection.execute(query);
    const rows = result.rows;
    if(!rows.length){
        return res.status(204).json({message: "Table is empty"});
    }
    
    connection.close();
    return res.status(200).json({cars: rows});
});

export const getAvailableCars = tryCatchWrapper(async function (req, res) {
    
    let query = `SELECT * FROM car WHERE status = 'available'`;
    let connection = await OracleDB.getConnection();
    let result = await connection.execute(query)
    let rows = result.rows;
    connection.close();
    return res.status(201).json({availableCars: rows});
})

//BU FONKSİYON DÜZELTİLECEK
export const addNewRent = tryCatchWrapper(async function (req,res){
    const {customerid, contact_number} = req.body;
    const query = `
    UPDATE customers 
    SET CONTACTNUMBER = :contact_number 
    WHERE CUSTOMERID = :customerid`;
    console.log(customerid,contact_number)
    let connection = await OracleDB.getConnection();
    connection.execute(query, { contact_number, customerid } );
    connection.commit()
    connection.close();
    return res.status(200).json({message:"Entity altered successfuly"})
})

//BU FONKSİYON DÜZENLENECEK
export const deleteRent = tryCatchWrapper(async function (req,res) {
    const {customerid} = req.body;
    const query = `
    UPDATE cars
    SET availability = 'available' 
    WHERE CUSTOMERID = :customerid`;
    console.log(customerid,contact_number)
    let connection = await OracleDB.getConnection();
    connection.execute(query, {customerid } );
    connection.commit()
    connection.close();
    return res.status(200).json({message:"Entity altered successfuly"})
    
});

export const getCarById = tryCatchWrapper(async function (req,res){
    const {carid} = req.body;
    const query = `SELECT * FROM cars WHERE carid = :carid`;
    let connection = await OracleDB.getConnection();
    let results = await connection.execute(query, {carid});
    let data = results.rows;
    connection.close()
    return res.status(200).json({cars: data});

});

export const getRentedCars = tryCatchWrapper(async function (req, res) {
    
    let query = `SELECT * FROM Cars 
    WHERE availability == 0;`
    let connection = await OracleDB.getConnection();
    let result = await connection.execute(query)
    let rows = result.rows;
    connection.close();
    return res.status(201).json({availableCars: `${rows}`});
})

