import OracleDB from "oracledb";

OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

async function fun() {
    let con;
    try {
        con = await OracleDB.getConnection({
            user: process.env.db_user,
            password: process.env.db_pass,
            connectionString: process.env.conString
            
        })
        console.log("Connection established successfuly!")
    }
    catch (err){
        console.error(err);
    }
}
fun();