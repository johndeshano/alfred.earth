const fs = require("fs");
const discord = require("discord.js");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const chalk = require("chalk");
const lessMiddleware = require("less-middleware");
const dotenv = require("dotenv");

const router = require("./router.js");

// Check if port is valid
const iPort = parseInt(process.env.PORT);
if(iPort == undefined || iPort <= 0 || iPort > 65535){
    console.log(chalk.red("Invalid port provided, exiting..."));
    process.exit(1);
}



//* -----------------------------
//* --- Express Configuration ---
//* -----------------------------
const app = express();

app.set("port", process.env.PORT);
app.set("view engine", "pug");
app.set("views", __dirname + "/views/");



//* ------------------
//* --- Middleware ---
//* ------------------
// Serving static files
app.use("/static/css/", lessMiddleware(__dirname + "/static/css/"));
app.use("/static/", express.static(__dirname + "/static/"));

// Route Logging
app.use(morgan("dev"));

// Compression
app.use(compression());



//* --------------------
//* --- View Routing ---
//* --------------------
app.use(router);



//* ----------------------------------
//* --- Web Server Start Listening ---
//* ----------------------------------
app.listen(app.get("port"), function(){
    console.log(chalk.cyan("[Express]") + " Started listing on port " + chalk.cyan(app.get("port")));
});
