const fs = require("fs");
const discord = require("discord.js");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const chalk = require("chalk");
const lessMiddleware = require("less-middleware");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const modCommands = require("./modules/commands.js");

const model_message = require("./models/message.js");
const model_user = require("./models/user.js");



//* ----------------------------
//* --- Enviroment Variables ---
//* ----------------------------
dotenv.config();

// Make sure process variable username exits
const szDBUsername = process.env.DATABASE_USERNAME;
if(szDBUsername == undefined || szDBUsername == ""){
    console.log(chalk.red("[Datbase] ") + "Invalid Username Variable");
    process.exit(1);
}

// Make sure process variable password exits
const szDBPassword = process.env.DATABASE_PASSWORD;
if(szDBPassword == undefined || szDBPassword == ""){
    console.log(chalk.red("[Datbase] ") + "Invalid Password Variable");
    process.exit(1);
}

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



//* -------------------------
//* --- Discord Bot Setup ---
//* -------------------------
// Create Discord Client
const client = new discord.Client();

// Set express variable
app.set("discord", client);

// Client is ready and logged in
client.on("ready", function(){
    console.log(chalk.cyan("[Discord]") + " At your service");
});

// When a user sends a message
client.on("message", function(pMessage){
    // Run commands module
    modCommands(pMessage);
});

client.login(process.env.DISCORD_TOKEN);



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


//* ----------------------
//* --- Database Setup ---
//* ----------------------


const szConnection = "mongodb+srv://" + szDBUsername + ":" + szDBPassword + "@cluster0.iuhlh.mongodb.net/alfred?retryWrites=true&w=majority";
mongoose.connect(szConnection, {useUnifiedTopology: true, useNewUrlParser: true }, function(err){
    if(err) throw err;
    else console.log(chalk.cyan("[Database]") + " Connection successfully established");
});



//* ----------------------------------
//* --- Web Server Start Listening ---
//* ----------------------------------
app.listen(app.get("port"), function(){
    console.log(chalk.cyan("[Express]") + " Started listing on port " + chalk.cyan(app.get("port")));
});