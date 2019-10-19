"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var redux_logger_1 = require("redux-logger");
var redux_1 = require("redux");
function makeStore(reducer) {
    var loggerMiddleware = redux_logger_1.createLogger();
    var store = redux_1.createStore(reducer, redux_1.applyMiddleware(redux_thunk_1.default, loggerMiddleware));
    return store;
}
exports.makeStore = makeStore;
