"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var fetch_1 = require("../../util/fetch");
var FecthTodoAPI = (function (_super) {
    __extends(FecthTodoAPI, _super);
    function FecthTodoAPI(args) {
        var _this = _super.call(this) || this;
        _this.liveConnection = new WebSocket(args.liveUrl);
        _this.liveConnection.onmessage = function () {
            _this.emit("update");
        };
        _this.on("update", function () {
            console.log("updating");
        });
        console.log(args);
        _this.args = args;
        return _this;
    }
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
}(events_1.EventEmitter));
exports.FecthTodoAPI = FecthTodoAPI;
;
