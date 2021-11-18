"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ZutatSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    alkohol: {
        type: Number,
        required: false
    },
    bestand: {
        type: Number,
        required: false
    },
    bestand_einheit: {
        type: String,
        required: false
    }
});
exports["default"] = mongoose_1.model('Zutaten', ZutatSchema);
