const mongoose = require("mongoose");

var MessageModel = mongoose.model("message", {
    author: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date
    }
});