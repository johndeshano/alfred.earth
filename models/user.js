const mongoose = require("mongoose");

var UserModel = mongoose.model("user", {
    name: {
        type: String
    },
    id: {
        type: String
    },
});