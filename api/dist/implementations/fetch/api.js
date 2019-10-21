"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("../../util/fetch");
var FecthTodoAPI = (function () {
    function FecthTodoAPI(args) {
        var _this = this;
        this.listeners = [];
        this.liveConnection = new WebSocket(args.liveUrl);
        this.liveConnection.onmessage = function () {
            _this.emit("update");
        };
        this.listen(function () {
            console.log("updating");
        });
        console.log(args);
        this.args = args;
    }
    FecthTodoAPI.prototype.listen = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return function () {
            _this.listeners.filter(function (l) {
                return l != listener;
            });
        };
    };
    FecthTodoAPI.prototype.emit = function (value) {
        this.listeners.forEach(function (l) {
            l(value);
        });
    };
    FecthTodoAPI.prototype.r_All = function () {
        return fetch_1.fetch(this.args.url + "/todo/request").then(fetch_1.handleResponse);
    };
    FecthTodoAPI.prototype.r_List = function () {
        return fetch_1.fetch(this.args.url + "/todo/request/keys").then(fetch_1.handleResponse);
    };
    FecthTodoAPI.prototype.r_Single = function (id) {
        return fetch_1.fetch(this.args.url + "/todo/request/" + id).then(fetch_1.handleResponse);
    };
    FecthTodoAPI.prototype.c_createItem = function (item) {
        console.log("creating", item, this.args.url + "/todo/create");
        return fetch_1.fetch(this.args.url + "/todo/create", {
            method: "post",
            body: fetch_1.jsonToFormData(item)
        }).then(fetch_1.handleResponse);
    };
    FecthTodoAPI.prototype.u_finishItem = function (id) {
        return fetch_1.fetch(this.args.url + "/todo/finish/" + id).then(fetch_1.handleResponse);
    };
    FecthTodoAPI.prototype.d_deleteItem = function (id) {
        return fetch_1.fetch(this.args.url + "/todo/delete/" + id).then(fetch_1.handleResponse);
    };
    return FecthTodoAPI;
}());
exports.FecthTodoAPI = FecthTodoAPI;
;
