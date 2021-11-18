"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var cocktail_1 = require("../controllers/cocktail"); // TODO
var validation_1 = require("../middleware/validation");
var yupValidiationModels_1 = require("../interfaces/yupValidiationModels");
var router = express_1.Router();
exports.router = router;
//Rezept routes
router.get('/rezept/:name', cocktail_1["default"].getRezept);
router.get('/rezepte/all', cocktail_1["default"].getAllRezepte);
router.get('/random/rezept', cocktail_1["default"].getRandomRezept);
router.post('/rezept/:name', validation_1["default"](yupValidiationModels_1.CocktailSchema), cocktail_1["default"].updateRezept);
router.post('/rezept', validation_1["default"](yupValidiationModels_1.CocktailSchema), cocktail_1["default"].createRezept);
//Zutaten routes
router.get('/zutat/:name', cocktail_1["default"].getZutat);
router.get('/zutaten/all', cocktail_1["default"].getAllZutat);
router.post('/zutat/:name', validation_1["default"](yupValidiationModels_1.ZutatSchema), cocktail_1["default"].updateZutat);
router.post('/zutat', validation_1["default"](yupValidiationModels_1.ZutatSchema), cocktail_1["default"].createZutat);
//Utensilien
router.get('/utensil/all', cocktail_1["default"].getAllUtensil);
