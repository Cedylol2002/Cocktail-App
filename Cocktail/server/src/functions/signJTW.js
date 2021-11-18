"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var logging_1 = require("../config/logging");
var NAMESPACE = 'Auth';
var signJWT = function (user, callback) {
    var date = new Date();
    date.setSeconds(Date.now() + parseInt(process.env.SERVER_TOKEN_EXPIRETIME_ACCESS));
    var expiredAt = parseInt(process.env.SERVER_TOKEN_EXPIRETIME_ACCESS);
    logging_1["default"].info(NAMESPACE, "Attempting to sign token for " + user._id);
    logging_1["default"].info(NAMESPACE, 'Expires in:' + date.toTimeString());
    try {
        jsonwebtoken_1.sign({
            sub: user._id,
            iat: Math.floor(Date.now() / 1000)
        }, process.env.SERVER_TOKEN_SECRET, {
            issuer: process.env.SERVER_TOKEN_ISSUER,
            algorithm: 'HS256',
            expiresIn: expiredAt
        }, function (error, token) {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        logging_1["default"].error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};
exports["default"] = signJWT;
