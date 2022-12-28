// entry point to our server

const express = require("express"); //bringing express.js that is our backend web framework
const dotenv = require("dotenv").config(); //so that we can have env variables
//config: allow us to have a dotenv file without variables in it

const port= process.env.PORT || 5000;
//port: which port we want server to run on


const app= express(); //initializing express

app.listen(port, ()=> console.log(`Server started on port ${port}`))

// start from first route