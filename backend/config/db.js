const mongoose = require('mongoose')

// all the mongoose functions are asynchronous 
const connectDB = async () => {
    mongoose.set("strictQuery", true);
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB