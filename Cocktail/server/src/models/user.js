"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// Nutzer model
// Wird für anmelden genutzt
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favoriten: [],
    admin: Boolean
});
exports["default"] = mongoose_1.model('User', UserSchema);
