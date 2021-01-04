const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    id: {
        type: Number
    }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;