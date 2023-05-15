class ApiError extends Error{
constructor(status,message){
    super();
    this.status = status
    this.massage = message
}
static badRequest(message){
    // console.log("7777",message)
    return new ApiError(404,message)
}
static internal(message){
    return new ApiError(500,message)
}
static forbidden(message){
    return new ApiError(403,message)
}
}

module.exports= ApiError
