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
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var express = require("express");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var passport = require("passport");
// midlleware imports
var passport_1 = require("./middleware/passport");
// config imports
var logging_1 = require("./config/logging");
// routes imports
var userRoutes = require("./routes/user");
var cocktailRoutes = require("./routes/cocktail");
// socket io controller imports
var socketIO_1 = require("./controllers/socketIO");
var NAMESPACE = 'Server';
/*
 * Express decleration/ socket.io decleration
 */
var app = express();
var httpserver = http_1.createServer(app);
var io = new socket_io_1.Server(httpserver, { path: '/notifications' });
/*
 * Verbindung mit der Datenbank aufbauen
 */
var url = "mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST;
var opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true,
    useFindAndModify: false
};
mongoose
    .connect(url, opts)
    .then(function (result) {
    logging_1["default"].info(NAMESPACE, 'Deine Mongo ist Connected', result);
})["catch"](function (error) {
    logging_1["default"].error(NAMESPACE, error.message, error);
});
/**
 * Log the request
 * */
app.use(function (req, res, next) {
    /**
     * Log the request
     * */
    logging_1["default"].info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        /**
         * Log the result
         * */
        logging_1["default"].info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
/*
 * Parse the body of the request
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
/**
 * Passport
 *  */
passport_1["default"](passport);
app.use(passport.initialize());
/**
 * Rules of our API
 * */
app.use(cors({ credentials: true, origin: ['http://localhost:8081', 'http://localhost:8080', 'http://localhost:5000'], methods: ['GET', 'POST'] }));
/**
 *  Routes go here
 *  */
app.use('/api/users', userRoutes.router);
app.use('/api/cocktail/', cocktailRoutes.router);
/*
 * Socket.io
 */
/*
 * Dict with socket id and user
 */
var socketUserMap = new Map();
/*
 * events
 */
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Connect logic and all other event
        // Map socket id to user
        socketUserMap.set(socket.data.user, socket.id);
        socket.on('OnCocktailOrder', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                socketIO_1["default"].OnCocktailOrder(socket, socket.data.toUser);
                io.to(socketUserMap[socket.data.toUser]).emit('OrderedCocktail', socket.data.notification);
                return [2 /*return*/];
            });
        }); });
        socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
/**
 * Error handling
 *  */
app.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
    next();
});
app.listen(process.env.SERVER_PORT, function () { return logging_1["default"].info(NAMESPACE, "Server is running " + process.env.SERVER_HOSTNAME + ":" + process.env.SERVER_PORT); });
exports["default"] = app;
