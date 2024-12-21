import customError from "./customError.js"
export function tryCatchWrapper(func) {
    return async (req, res,) => {
    try{
        await func(req,res) 
        } 
    catch (error) {
        return new customError(error, 400);
        }
    }
}