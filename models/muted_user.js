const mongoose = require("mongoose");

const MutedUserSchema = new mongoose.Schema({
    user_id: {
        type: Number
    },
    guild_id: {
        type: Number
    }
});

const MutedUserModel = mongoose.model("MutedUser", MutedUserSchema);

module.exports = MutedUserModel;