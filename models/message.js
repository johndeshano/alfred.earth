const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    author_id: {
        type: Number,
        null: false
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;