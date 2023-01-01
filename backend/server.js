// entry point to our server

const express = require("express"); //bringing express.js that is our backend web framework
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware"); //bringing the errorHandler
const dotenv = require("dotenv").config(); //so that we can have env variables
//config: allow us to have a dotenv file without variables in it

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;
//port: which port we want server to run on

connectDB();

const app = express(); //initializing express

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //middleware lines

app.use("/api/goals", require("./routes/goalRoutes"));
// this will look into the specified file and will add the path specified there to the path specified here.
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
