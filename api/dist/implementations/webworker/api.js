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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var promise_1 = require("../../util/promise");
var db_tools_1 = require("../../util/db-tools");
var worker_1 = require("./worker");
var ts_inline_webworker_1 = __importDefault(require("ts-inline-webworker"));
var WebWorkerTodoAPI = (function (_super) {
    __extends(WebWorkerTodoAPI, _super);
    function WebWorkerTodoAPI() {
        var _this = _super.call(this) || this;
        _this.idListeners = {};
        _this.worker = new ts_inline_webworker_1.default(worker_1.run);
        _this.worker.onmessage = function (e) {
            _this.resolveResponse(JSON.parse(e.data));
        };
        _this.on("update", function () {
            console.log("updating");
        });
        return _this;
    }
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
        return new promise_1.Promise(function (res, rej) {
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
}(events_1.EventEmitter));
exports.WebWorkerTodoAPI = WebWorkerTodoAPI;
;
