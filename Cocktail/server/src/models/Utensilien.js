"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UtensilSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports["default"] = mongoose_1.model('utensilien', UtensilSchema);
