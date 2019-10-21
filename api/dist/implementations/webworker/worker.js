"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run() {
    var i = 0;
    function uniqueID() {
        return (Date.now().toString(32)
            + (i++).toString(32)
            + Math.random().toString(32).substring(2));
    }
    var JSONObjectTodoApi = (function () {
        function JSONObjectTodoApi() {
            this.values = {};
            this.listeners = [];
        }
        JSONObjectTodoApi.prototype.listen = function (listener) {
            var _this = this;
            this.listeners.push(listener);
            return function () {
                _this.listeners.filter(function (l) {
                    return l != listener;
                });
            };
        };
        JSONObjectTodoApi.prototype.emit = function (value) {
            this.listeners.forEach(function (l) {
                l(value);
            });
        };
        JSONObjectTodoApi.prototype.r_List = function () {
            return Promise.resolve(Object.keys(this.values));
        };
        JSONObjectTodoApi.prototype.r_Single = function (id) {
            return Promise.resolve(this.values[id]);
        };
        JSONObjectTodoApi.prototype.r_All = function () {
            return Promise.resolve(Object.values(this.values));
        };
        JSONObjectTodoApi.prototype.c_createItem = function (itemInit) {
            var id = uniqueID();
            var item = JSON.parse(JSON.stringify(itemInit));
            item._id = id;
            this.values[id] = item;
            this.emit("update");
            return Promise.resolve(this.values[id]);
        };
        JSONObjectTodoApi.prototype.u_finishItem = function (id) {
            if (!(id in this.values)) {
                return Promise.reject("Non existant");
            }
            var value = this.values[id];
            if (value.finished) {
                return Promise.reject(new Error("already finished"));
            }
            value.finished = Date.now();
            this.values[id] = value;
            this.emit("update");
            return Promise.resolve(value);
        };
        JSONObjectTodoApi.prototype.d_deleteItem = function (id) {
            if (!(id in this.values)) {
                return Promise.reject("Non existant");
            }
            var value = this.values[id];
            delete this.values[id];
            this.emit("update");
            return Promise.resolve(value);
        };
        return JSONObjectTodoApi;
    }());
    ;
    var api = new JSONObjectTodoApi();
    api.listen(function () {
        self.postMessage(JSON.stringify({
            type: "event",
            path: "update"
        }));
    });
    function handlePromise(initData, p) {
        p.then(function (value) {
            self.postMessage(JSON.stringify({
                type: "request",
                status: "result",
                id: initData.id,
                value: value
            }));
        }, function (err) {
            self.postMessage(JSON.stringify({
                type: "request",
                status: "error",
                id: initData.id,
                value: err.toString()
            }));
        });
    }
    self.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data.type === "request") {
            if (data.status === "init") {
                switch (data.path) {
                    case "list":
                        return handlePromise(data, api.r_List.apply(api, data.args));
                    case "single":
                        return handlePromise(data, api.r_Single.apply(api, data.args));
                    case "all":
                        return handlePromise(data, api.r_All.apply(api, data.args));
                    case "create":
                        return handlePromise(data, api.c_createItem.apply(api, data.args));
                    case "finish":
                        return handlePromise(data, api.u_finishItem.apply(api, data.args));
                    case "delete":
                        return handlePromise(data, api.d_deleteItem.apply(api, data.args));
                    default:
                        self.postMessage(JSON.stringify({
                            type: "request",
                            status: "error",
                            id: data.id,
                            value: "route not found"
                        }), "*");
                }
            }
        }
    };
}
exports.run = run;
