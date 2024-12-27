import OracleDB from "oracledb";
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";
import {json} from "express"

export const getAllCars = tryCatchWrapper( async function(req, res) {
    let connection = await OracleDB.getConnection();
    let query = "SELECT * FROM car";
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

export const getUnavailableCars = tryCatchWrapper(async function (req, res) {
    let query = `SELECT * FROM car WHERE status = 'not available'`;
    let connection = await OracleDB.getConnection();
    let result = await connection.execute(query)
    let rows = result.rows;
    connection.close();
    return res.status(201).json({unavailableCars: rows});
})


export const getPayment = tryCatchWrapper(async function (req,res){
    const {paymentid, paymentmethod, amount, paymentdate} = req.body;
    let query = `INSERT INTO payment(PAYMENTID,PAYMENTMETHOD,AMOUNT,PAYMENTDATE)
                VALUES(:PAYMENTID,:PAYMENTMETHOD,:AMOUNT,:PAYMENTDATE);`
    let connection = await OracleDB.getConnection();
    connection.execute(query, {paymentid,paymentmethod,amount,paymentdate});
    connection.close()
    return res.status(201).json({message: "New payment added to table"})
})


export const setAvailable = tryCatchWrapper(async function (req,res) {
    const {carid} = req.body;
    const query = `
    UPDATE car
    SET STATUS = 'available' 
    WHERE carid = :carid`;
    console.log(carid)
    let connection = await OracleDB.getConnection();
    connection.execute(query, {carid} );
    connection.commit()
    connection.close();
    return res.status(200).json({message:"Entity altered successfuly"})
    
});

export const getCarById = tryCatchWrapper(async function (req,res){
    const {carid} = req.params;
    const query = `SELECT * FROM CAR WHERE carid = :carid`;
    let connection = await OracleDB.getConnection();
    let results = await connection.execute(query, {carid});
    let data = results.rows;
    connection.close()
    return res.status(200).json({car: data});

});

export const deleteLatestTransaction = tryCatchWrapper(async function (req,res) {
    let query1 = `SELECT MAX(TRANSACTIONID) FROM RENTALTRANSACTION`
    let connection = await OracleDB.getConnection();
    let latestTransaction = await connection.execute(query1);
    let query2 = `DELETE FROM RENTALTRANSACTION WHERE TRANSACTIONID =:TRANSACTIONID`;
    connection.execute(query2),{latestTransaction};
    connection.close();
    return res.status(201).json({message:"Table altered successfuly"});
})

export const addNewTransaction = tryCatchWrapper(async function (req,res) {
    const {totalcost, rentdate,returndate,carid} = req.body;
    let query1 = `SELECT MAX(TRANSACTIONID) FROM RENTALTRANSACTION`
    let connection = await OracleDB.getConnection();
    let latestTransaction = await connection.execute(query1);
    latestTransaction = latestTransaction + 1;
    let query2 = `INSERT INTO RENTALTRANSACTION(TRANSACTIONID,RENTALDATE,RETURNDATE,TOTALCOST,CARID)
                    VALUES (${latestTransaction},'${rentdate},'${returndate}',${totalcost},${carid});`
    connection.execute(query2);
    connection.close();
    return res.status(201).json({message:"New transaction added successfuly"});

})

export const addCar = tryCatchWrapper(async function (req,res) {
    const {carid,brand,carmodel,caryear,rentaldate} = req.body;
    let query = `INSERT INTO CAR (${carid},${brand},${carmodel},${caryear},NULL,NULL,${rentaldate})`;
    let connection = await OracleDB.getConnection();
    connection.execute(query);
    connection.close()
    return res.status(201).json({message: "New car added to db"})
})

export const deleteCar = tryCatchWrapper(async function (req,res) {
    const {carid} = req.body;
    let query = `DELETE FROM car WHERE carid =${carid}`;
    let connection = await OracleDB.getConnection();
    connection.execute(query);
    connection.commit();
    connection.close();
    return res.status(201).json({message: "Car deleted from db"});
})

export const changeRentDate = tryCatchWrapper(async function (req,res) {
   
    const {carid,start_date,end_date} = req.body
    console.log(carid,start_date,end_date);
    console.log(typeof(start_date))
    const query = `UPDATE car 
    SET AVAILDATESTART = TO_TIMESTAMP(:start_date, 'YYYY-MM-DD HH24:MI:SS'), 
        AVAILDATEEND = TO_TIMESTAMP(:end_date, 'YYYY-MM-DD HH24:MI:SS')
    WHERE carid = :carid`
    
    
    let connection = await OracleDB.getConnection();
    connection.execute(query, {start_date,end_date,carid});
    connection.commit();
    connection.close();
    return res.status(201).json({message:"Car updated successfuly"})
    
})
