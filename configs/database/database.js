import OracleDB from "oracledb";


let pool;
async function initDbPool(dbUser,dbPass,conString) {
    try {
        pool = await OracleDB.createPool({
            user: dbUser,
            password: dbPass,
            connectionString: conString,
            poolMin: 1,
            poolMax: 6,
            poolIncrement: 1,
        });
        console.log(`Database pool created`);
    }
    catch (err){
            console.error(err);
    }
}
export {
    initDbPool
}
