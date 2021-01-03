const discord = require("discord.js");
const express = require("express");
const morgan = require("morgan");
const lessMiddleware = require("less-middleware");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const model_message = require("./models/message.js");
const model_user = require("./models/user.js");

//* -----------------------------
//* --- Express Configuration ---
//* -----------------------------
dotenv.config();
const app = express();
app.set("port", 8080);
app.set("view engine", "pug");
app.set("views", __dirname + "/views/");



//* ------------------
//* --- Middleware ---
//* ------------------
app.use(morgan("dev"));
app.use("/static/css/", lessMiddleware(__dirname + "/static/css/"));
app.use("/static/", express.static(__dirname + "/static/"));



//* --------------------
//* --- View Routing ---
//* --------------------
app.get("/", function(req, res){
    res.render("home.pug", { title: "Home" });
});



//* -------------------------
//* --- Discord Bot Setup ---
//* -------------------------
const client = new discord.Client();

client.on("ready", function(){
    console.log("[Discord] At your service");
});

client.on("message", function(pMessage){
    console.log(pMessage.author)
    console.log(pMessage.author.username + ": " + pMessage.content);

    if(pMessage.content.toLowerCase() == "hi alfred"){
        pMessage.channel.send("sup bitch");
    }

    if(pMessage.content.toLowerCase() == "alfred start listening"){
        pMessage.react("👍")
    }

    var new_message = new model_message({
        
    });


});

client.login(process.env.DISCORD_TOKEN);


//* ----------------------
//* --- Database Setup ---
//* ----------------------
const szConnection = "mongodb+srv://alfred:4lMuicgK9osmBaZk@cluster0.iuhlh.mongodb.net/alfred?retryWrites=true&w=majority";
mongoose.connect(szConnection, {useUnifiedTopology: true, useNewUrlParser: true })




//* ----------------------------------
//* --- Web Server Start Listening ---
//* ----------------------------------
app.listen(app.get("port"), function(){
    console.log("[Express] Started listening on port " + app.get("port"));
});