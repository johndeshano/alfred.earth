const express = require("express");

const router = express.Router();

router.get("/", function(req, res){
    res.locals.title = "Home";

    res.render("home.pug");
});


module.exports = router;
