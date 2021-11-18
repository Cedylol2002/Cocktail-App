"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var NotificationSchema = new mongoose_1.Schema({
    message: { type: String, required: true },
    delivered: {
        type: Boolean,
        required: true,
        "default": false
    },
    toUser: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    fromUser: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports["default"] = mongoose_1.model('notifications', NotificationSchema);
