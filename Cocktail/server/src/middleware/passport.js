"use strict";
exports.__esModule = true;
var JwtStrategy = require("passport-jwt");
var user_1 = require("../models/user");
var options = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SERVER_TOKEN_SECRET,
    algorithms: ['HS256']
};
var passportStrat = function (passport) {
    passport.use(new JwtStrategy.Strategy(options, function (jwt_payload, done) {
        user_1["default"].findById({ _id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
};
exports["default"] = passportStrat;
