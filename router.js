const express = require("express");

const router = express.Router();

router.get("/", function(req, res){
    res.locals.title = "Home";
    res.locals.discord = req.app.get("discord");
    res.locals.guilds = [];

    // Convert map to array for pugjs
    req.app.get("discord").guilds.cache.forEach(function(guild){
        res.locals.guilds.push(guild);
    });

    res.render("home.pug");
});


module.exports = router;