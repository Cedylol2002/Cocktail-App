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
var bcryptjs_1 = require("bcryptjs");
var user_1 = require("../models/user");
var refreshToken_1 = require("../models/refreshToken");
var signJTW_1 = require("../functions/signJTW");
// Register Funktion
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, admin, resultname, resultemail;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, admin = _a.admin;
                return [4 /*yield*/, user_1["default"].findOne({ username: username })];
            case 1:
                resultname = _b.sent();
                return [4 /*yield*/, user_1["default"].findOne({ email: email })];
            case 2:
                resultemail = _b.sent();
                if (resultname || resultemail) {
                    return [2 /*return*/, res.status(401).json({
                            message: 'user already exists'
                        })];
                }
                bcryptjs_1.hash(password, 10, function (hashError, hash) {
                    if (hashError) {
                        return res.status(401).json({
                            message: hashError.message,
                            error: hashError
                        });
                    }
                    var _user = new user_1["default"]({
                        _id: new mongoose_1.Types.ObjectId(),
                        username: username,
                        password: hash,
                        email: email,
                        favoriten: [],
                        admin: admin
                    });
                    return _user
                        .save()
                        .then(function () {
                        return res.sendStatus(201);
                    })["catch"](function (error) {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
//Login Funktion
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password;
    return __generator(this, function (_b) {
        _a = req.body, username = _a.username, password = _a.password;
        user_1["default"].findOne({ username: username })
            .exec()
            .then(function (user) {
            bcryptjs_1.compare(password, user.password, function (error, result) {
                if (error || !result) {
                    return res.status(401).json({
                        message: 'Password Falsch'
                    });
                }
                else if (result) {
                    signJTW_1["default"](user, function (_error, token) { return __awaiter(void 0, void 0, void 0, function () {
                        var refreshToken_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!_error) return [3 /*break*/, 1];
                                    return [2 /*return*/, res.status(500).json({
                                            message: _error.message,
                                            error: _error
                                        })];
                                case 1:
                                    if (!token) return [3 /*break*/, 4];
                                    return [4 /*yield*/, refreshToken_1["default"].findOneAndDelete({ user: user._id })];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, refreshToken_1["default"].createToken(user)];
                                case 3:
                                    refreshToken_2 = _a.sent();
                                    res.cookie('refreshToken', refreshToken_2, {
                                        httpOnly: true,
                                        secure: true,
                                        signed: true
                                    });
                                    return [2 /*return*/, res.status(200).json({
                                            message: 'Login erfolgreich',
                                            accesstoken: token,
                                            user: user.username
                                        })];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                }
            });
        })["catch"](function (err) {
            res.status(400).json({
                message: 'User not found'
            });
        });
        return [2 /*return*/];
    });
}); };
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestToken, refreshToken_3, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestToken = req.signedCookies.refreshToken;
                if (requestToken == null) {
                    return [2 /*return*/, res.status(403).json({ message: 'Refresh Token is required!' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, refreshToken_1["default"].findOne({ token: requestToken })];
            case 2:
                refreshToken_3 = _a.sent();
                if (!refreshToken_3) {
                    res.clearCookie('refreshToken');
                    res.status(403).json({ message: 'Refresh token is not in database!' });
                    return [2 /*return*/];
                }
                if (refreshToken_1["default"].verifyExpiration(refreshToken_3)) {
                    res.clearCookie('refreshToken');
                    refreshToken_1["default"].findByIdAndRemove(refreshToken_3._id, { useFindAndModify: false }).exec();
                    res.status(403).json({
                        message: 'Refresh token was expired. Please make a new signin request'
                    });
                    return [2 /*return*/];
                }
                signJTW_1["default"](refreshToken_3.user, function (_error, token) {
                    if (_error) {
                        return res.status(500).json({
                            message: _error.message,
                            error: _error
                        });
                    }
                    else if (token) {
                        return res.status(200).json({
                            message: 'Refresh erfolgreich',
                            accesstoken: token
                        });
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).send({ message: err_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestToken;
    return __generator(this, function (_a) {
        try {
            requestToken = req.signedCookies.refreshToken;
            res.clearCookie('refreshToken');
            refreshToken_1["default"].findOneAndDelete({ token: requestToken }, { useFindAndModify: false })
                .exec()
                .then(function () { return res.status(204).json({ message: 'loggedout' }); })["catch"](function (err) { return res.status(500).json({ message: err }); });
        }
        catch (err) {
            res.status(400).json({ message: 'user was not logged in' });
        }
        return [2 /*return*/];
    });
}); };
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = req.user;
        res.status(200).json(user);
        return [2 /*return*/];
    });
}); };
var findUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        user_1["default"].findOne({ _id: req.params.userId })
            .exec()
            .then(function (user) {
            return res.status(200).json({
                user: user
            });
        })["catch"](function (error) {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
        return [2 /*return*/];
    });
}); };
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, admin, favoriten, user;
    return __generator(this, function (_b) {
        _a = req.body, username = _a.username, password = _a.password, email = _a.email, admin = _a.admin, favoriten = _a.favoriten;
        user = req.user;
        if (password) {
            bcryptjs_1.hash(password, 10, function (hashError, hash) {
                if (hashError) {
                    return res.status(401).json({
                        message: hashError.message,
                        error: hashError
                    });
                }
                user_1["default"].findOneAndUpdate({ _id: req.params.userId }, { username: username, password: hash, email: email, admin: admin }, {
                    "new": true
                })
                    .then(function (updateUser) { return res.status(200).send(updateUser); })["catch"](function (err) {
                    return res.status(500).json({
                        message: err.message,
                        err: err
                    });
                });
            });
        }
        else {
            user_1["default"].findOneAndUpdate({ _id: req.params.userId }, { username: username, password: user.password, email: email, admin: admin, favoriten: favoriten }, {
                "new": true
            })
                .then(function (updateUser) { return res.status(200).send(updateUser); })["catch"](function (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                });
            });
        }
        return [2 /*return*/];
    });
}); };
var allUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        user_1["default"].find({})
            .then(function (users) { return res.status(200).send(users); })["catch"](function (err) {
            return res.status(500).json({
                message: err.message,
                err: err
            });
        });
        return [2 /*return*/];
    });
}); };
var changeName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, ID, update;
    return __generator(this, function (_a) {
        username = req.body.username;
        ID = { _id: req.params.userId };
        update = { username: username };
        user_1["default"].findOneAndUpdate(ID, update, {
            "new": true
        })
            .then(function (username) { return res.status(200).send(username); })["catch"](function (err) {
            return res.status(500).json({
                message: err.message,
                err: err
            });
        });
        return [2 /*return*/];
    });
}); };
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var password, ID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.password;
                ID = { _id: req.params.userId };
                return [4 /*yield*/, bcryptjs_1.hash(password, 10, function (hashError, hash) {
                        if (hashError) {
                            return res.status(401).json({
                                message: hashError.message,
                                error: hashError
                            });
                        }
                        user_1["default"].findOneAndUpdate(ID, { password: hash }, {
                            "new": true
                        })
                            .then(function (password) { return res.status(200).send(password); })["catch"](function (err) {
                            return res.status(500).json({
                                message: err.message,
                                err: err
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = { register: register, login: login, findUser: findUser, updateUser: updateUser, logout: logout, getUser: getUser, refreshToken: refreshToken, allUsers: allUsers, changeName: changeName, changePassword: changePassword };
