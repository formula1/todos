"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_tools_1 = require("../../util/db-tools");
var worker_1 = require("./worker");
var ts_inline_webworker_1 = __importDefault(require("ts-inline-webworker"));
var WebWorkerTodoAPI = (function () {
    function WebWorkerTodoAPI() {
        var _this = this;
        this.idListeners = {};
        this.listeners = [];
        this.worker = new ts_inline_webworker_1.default(worker_1.run);
        this.worker.onmessage = function (e) {
            _this.resolveResponse(JSON.parse(e.data));
        };
        this.listen(function () {
            console.log("updating");
        });
    }
    WebWorkerTodoAPI.prototype.listen = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return function () {
            _this.listeners.filter(function (l) {
                return l != listener;
            });
        };
    };
    WebWorkerTodoAPI.prototype.emit = function (value) {
        this.listeners.forEach(function (l) {
            l(value);
        });
    };
    WebWorkerTodoAPI.prototype.initRequest = function (path, args) {
        var _this = this;
        var id = db_tools_1.uniqueID();
        var message = {
            type: "request",
            status: "init",
            path: path,
            id: id,
            args: args
        };
        return new Promise(function (res, rej) {
            _this.idListeners[id] = [res, rej];
            _this.worker.postMessage(JSON.stringify(message));
        });
    };
    WebWorkerTodoAPI.prototype.resolveResponse = function (mes) {
        if (mes.type === "event") {
            switch (mes.path) {
                case "update": return this.emit("update");
                default:
                    console.log("unexpected path", mes);
                    return;
            }
        }
        if (mes.type === "request") {
            if (mes.status === "init") {
                console.error("not expecting request", mes);
                return;
            }
            if (!(mes.id in this.idListeners)) {
                console.error("not listening for message id", mes);
                return;
            }
            var listeners = this.idListeners[mes.id];
            delete this.idListeners[mes.id];
            switch (mes.status) {
                case "result":
                    return listeners[0](mes.value);
                case "error":
                    return listeners[1](mes.value);
                default:
                    console.error("not listening for message id", mes);
                    return;
            }
        }
    };
    WebWorkerTodoAPI.prototype.r_All = function () {
        return this.initRequest("all", []);
    };
    WebWorkerTodoAPI.prototype.r_List = function () {
        return this.initRequest("list", []);
    };
    WebWorkerTodoAPI.prototype.r_Single = function (id) {
        return this.initRequest("single", [id]);
    };
    WebWorkerTodoAPI.prototype.c_createItem = function (item) {
        return this.initRequest("create", [item]);
    };
    WebWorkerTodoAPI.prototype.u_finishItem = function (id) {
        return this.initRequest("finish", [id]);
    };
    WebWorkerTodoAPI.prototype.d_deleteItem = function (id) {
        return this.initRequest("delete", [id]);
    };
    return WebWorkerTodoAPI;
}());
exports.WebWorkerTodoAPI = WebWorkerTodoAPI;
;
