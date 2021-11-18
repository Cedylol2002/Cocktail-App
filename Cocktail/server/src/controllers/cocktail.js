"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var cocktails_1 = require("../models/cocktails");
var zutat_1 = require("../models/zutat");
var Utensilien_1 = require("../models/Utensilien");
var getRezept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        cocktails_1["default"].findOne({ name: req.params.name })
            .lean()
            .exec(function (err, doc) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }
            return res.status(200).send(doc);
        });
        return [2 /*return*/];
    });
}); };
var getAllRezepte = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        cocktails_1["default"].find({}).exec(function (err, docs) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            }
            return res.status(200).json(docs);
        });
        return [2 /*return*/];
    });
}); };
var getRandomRezept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        cocktails_1["default"].find({})
            .lean()
            .exec(function (err, docs) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            }
            return res.status(200).send(docs[Math.floor(Math.random() * docs.length)]);
        });
        return [2 /*return*/];
    });
}); };
var createRezept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bild, name, alkohol, diff, anleitung, utensil, zutaten, _cocktail;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, bild = _a.bild, name = _a.name, alkohol = _a.alkohol, diff = _a.diff, anleitung = _a.anleitung, utensil = _a.utensil, zutaten = _a.zutaten;
                _cocktail = new cocktails_1["default"]({
                    _id: new mongoose_1.Types.ObjectId(),
                    bild: bild,
                    name: name,
                    alkohol: alkohol,
                    diff: diff,
                    anleitung: anleitung,
                    utensil: utensil,
                    zutaten: zutaten
                });
                return [4 /*yield*/, _cocktail
                        .save()
                        .then(function (cocktail) {
                        return res.status(201).json({
                            cocktail: cocktail
                        });
                    })["catch"](function (error) {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    })];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var updateRezept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cocktails_1["default"].findOneAndUpdate({ name: req.params.name }, req.body, {
                    "new": true
                })
                    .then(function (updatedRezept) { return res.status(200).send(updatedRezept); })["catch"](function (err) {
                    return res.status(500).json({
                        message: err.message,
                        err: err
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getZutat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        zutat_1["default"].findOne({ name: req.params.name })
            .lean()
            .exec(function (err, doc) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }
            return res.status(200).send(doc);
        });
        return [2 /*return*/];
    });
}); };
var getAllZutat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        zutat_1["default"].find({})
            .lean()
            .exec(function (err, doc) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            }
            return res.status(200).send(doc);
        });
        return [2 /*return*/];
    });
}); };
var createZutat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, alkohol, bestand, bestand_einheit, _zutat;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, alkohol = _a.alkohol, bestand = _a.bestand, bestand_einheit = _a.bestand_einheit;
                _zutat = new zutat_1["default"]({
                    _id: new mongoose_1.Types.ObjectId(),
                    name: name,
                    alkohol: alkohol,
                    bestand: bestand,
                    bestand_einheit: bestand_einheit
                });
                return [4 /*yield*/, _zutat
                        .save()
                        .then(function (zutat) {
                        return res.status(201).json({
                            zutat: zutat
                        });
                    })["catch"](function (error) {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    })];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var updateZutat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, zutat_1["default"].findOneAndUpdate({ name: req.params.name }, req.body, {
                    "new": true
                })
                    .then(function (updatedZutat) { return res.status(200).send(updatedZutat); })["catch"](function (err) {
                    return res.status(500).json({
                        message: err.message,
                        err: err
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getAllUtensil = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Utensilien_1["default"].find({})
            .select('-_id')
            .exec(function (err, doc) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            }
            return res.status(200).json(doc);
        });
        return [2 /*return*/];
    });
}); };
exports["default"] = {
    getRezept: getRezept,
    createRezept: createRezept,
    updateRezept: updateRezept,
    getZutat: getZutat,
    createZutat: createZutat,
    updateZutat: updateZutat,
    getAllRezepte: getAllRezepte,
    getRandomRezept: getRandomRezept,
    getAllZutat: getAllZutat,
    getAllUtensil: getAllUtensil
};
