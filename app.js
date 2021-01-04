const discord = require("discord.js");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const chalk = require("chalk");
const lessMiddleware = require("less-middleware");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const model_message = require("./models/message.js");
const model_user = require("./models/user.js");

//* -----------------------------
//* --- Express Configuration ---
//* -----------------------------
const app = express();
dotenv.config();

// Check if port is valid
if(process.env.PORT == undefined || process.env.PORT <= 0){
    console.log(chalk.red("Invalid port provided, exiting..."));
    process.exit(0);
}

app.set("port", process.env.PORT);
app.set("view engine", "pug");
app.set("views", __dirname + "/views/");



//* -------------------------
//* --- Discord Bot Setup ---
//* -------------------------
const client = new discord.Client();

client.on("ready", function(){
    console.log(chalk.cyan("[Discord]") + " At your service");
});

client.on("message", function(pMessage){
    if(pMessage.content.toLowerCase() == "hi alfred"){
        pMessage.channel.send("sup bitch");
    }

    if(pMessage.content.toLowerCase() == "alfred go"){
        pMessage.react("👍")
    }

    if(pMessage.author.username == "Nrgy"){
        pMessage.reply("kys");
    }
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
app.get("/", function(req, res){
    res.locals.title = "Home";
    res.locals.discord = client;
    res.locals.guilds = [];

    // Convert map to array for pugjs
    client.guilds.cache.forEach(function(guild){
        res.locals.guilds.push(guild);
    });

    res.render("home.pug");
});



//* ----------------------
//* --- Database Setup ---
//* ----------------------
const szConnection = "mongodb+srv://alfred:4lMuicgK9osmBaZk@cluster0.iuhlh.mongodb.net/alfred?retryWrites=true&w=majority";
mongoose.connect(szConnection, {useUnifiedTopology: true, useNewUrlParser: true })



//* ----------------------------------
//* --- Web Server Start Listening ---
//* ----------------------------------
app.listen(app.get("port"), function(){
    console.log(chalk.green("[Express]") + " Started listing on port " + chalk.cyan(app.get("port")));
});