import OracleDB from "oracledb";

OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

async function testCon(dbUser,dbPass,conString) {
    let con;
    try {
        con = await OracleDB.getConnection({
            user: dbUser,
            password: dbPass,
            connectionString: conString
            
        })
        console.log("Connection established successfuly!")
    }
    catch (err){
        console.error(err);
    }
};

export default testCon;

