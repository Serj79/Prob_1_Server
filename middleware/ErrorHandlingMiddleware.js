const ApiError = require('../error/ApiError');
 
module.exports= function(err,req,res,next){
    if (err instanceof ApiError){
        return res.status(err.status).json({message: err.massage})
    }
    return res.status(500).json({message:"Непредвиденная ошибка!"})
}