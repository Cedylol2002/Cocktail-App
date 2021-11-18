"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CockSchema = new mongoose_1.Schema({
    bild: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    alkohol: {
        type: Boolean
    },
    diff: {
        type: Number,
        required: true
    },
    anleitung: {
        type: String,
        required: true
    },
    utensil: {
        type: Array
    },
    zutaten: {
        type: Array,
        required: true
    }
});
exports["default"] = mongoose_1.model('Cocktail', CockSchema);
