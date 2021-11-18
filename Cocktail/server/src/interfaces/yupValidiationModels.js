"use strict";
exports.__esModule = true;
exports.UserChangeNameSchema = exports.UserChangePasswordSchema = exports.UtensilSchema = exports.UserLoginSchema = exports.UserRegisterSchema = exports.ZutatSchema = exports.CocktailSchema = void 0;
var yup = require("yup");
// Es wäre cool wenn man Interfaces nutzen kann aber well rip soweit ich das sehe in yup
var CocktailSchema = yup.object().shape({
    bild: yup.string().url().required(),
    name: yup.string().required(),
    alkohol: yup.boolean().required(),
    zutaten: yup.array().required(),
    diff: yup.number().required(),
    anleitung: yup.string().required(),
    utensil: yup.array().nullable()
});
exports.CocktailSchema = CocktailSchema;
var ZutatSchema = yup.object({
    name: yup.string().required(),
    alkohol: yup.boolean().nullable(),
    bestand: yup.number().required(),
    bestand_einheit: yup.string().required()
});
exports.ZutatSchema = ZutatSchema;
var UtensilSchema = yup.object({
    name: yup.string().required()
});
exports.UtensilSchema = UtensilSchema;
var UserRegisterSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
    admin: yup.boolean()["default"](false).required()
});
exports.UserRegisterSchema = UserRegisterSchema;
var UserLoginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().min(8).max(16).required()
});
exports.UserLoginSchema = UserLoginSchema;
var UserChangeNameSchema = yup.object({
    username: yup.string().required()
});
exports.UserChangeNameSchema = UserChangeNameSchema;
var UserChangePasswordSchema = yup.object({
    password: yup.string().required()
});
exports.UserChangePasswordSchema = UserChangePasswordSchema;
