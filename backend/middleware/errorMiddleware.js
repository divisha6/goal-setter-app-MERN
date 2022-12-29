// change the default error handler, we make use of middleware

const { request, response } = require("express")

// errorHandler has 4 parameters: 
//     - err: the error that needs to be handled,
//     - req : request
//     - res: response
//     - next: to call the next middleware NEW

const errorHandler= (err, req, res, next) => {
    const statusCode= res.statusCode ? res.statusCode : 500;
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
} 

module.exports= {
    errorHandler
}