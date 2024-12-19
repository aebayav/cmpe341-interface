const catchError = function (err, req, res, next){
    console.error(err);
    res.status(500).send({
        error: `Internal server error`,
        message: err.stack

    });
    next(err);
}
export default catchError