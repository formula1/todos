"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexeddb_1 = require("../../util/indexeddb");
var db_tools_1 = require("../../util/db-tools");
var constants_1 = require("./constants");
var IndexedDBTodoAPI = (function () {
    function IndexedDBTodoAPI(args) {
        this.listeners = [];
        this.listen(function () {
            console.log("updating");
        });
        this.args = args;
    }
    IndexedDBTodoAPI.prototype.listen = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return function () {
            _this.listeners.filter(function (l) {
                return l != listener;
            });
        };
    };
    IndexedDBTodoAPI.prototype.emit = function (value) {
        this.listeners.forEach(function (l) {
            l(value);
        });
    };
    IndexedDBTodoAPI.prototype.getDB = function () {
        return indexeddb_1.getDatabase(this.args);
    };
    IndexedDBTodoAPI.prototype.r_List = function () {
        return this.getDB().then(function (db) {
            return new Promise(function (res, rej) {
                var transaction = db.transaction([constants_1.TODO_OBJECT_STORE_NAME], "readwrite");
                var objectStore = transaction.objectStore(constants_1.TODO_OBJECT_STORE_NAME);
                var request = objectStore.getAllKeys();
                request.onerror = rej;
                request.onsuccess = function (ev) {
                    console.log(ev);
                    res(ev.target.result);
                };
            });
        });
    };
    IndexedDBTodoAPI.prototype.r_Single = function (id) {
        return this.getDB().then(function (db) {
            return new Promise(function (res, rej) {
                var transaction = db.transaction([constants_1.TODO_OBJECT_STORE_NAME], "readwrite");
                var objectStore = transaction.objectStore(constants_1.TODO_OBJECT_STORE_NAME);
                var request = objectStore.get(id);
                request.onerror = rej;
                request.onsuccess = function (ev) {
                    console.log(ev);
                    res(ev.target.result);
                };
            });
        });
    };
    IndexedDBTodoAPI.prototype.r_All = function () {
        return this.getDB().then(function (db) {
            return new Promise(function (res, rej) {
                var transaction = db.transaction([constants_1.TODO_OBJECT_STORE_NAME], "readwrite");
                var objectStore = transaction.objectStore(constants_1.TODO_OBJECT_STORE_NAME);
                var request = objectStore.getAll();
                request.onerror = rej;
                request.onsuccess = function (ev) {
                    console.log(ev);
                    res(ev.target.result);
                };
            });
        });
    };
    IndexedDBTodoAPI.prototype.c_createItem = function (item) {
        var _this = this;
        return this.getDB().then(function (db) {
            return new Promise(function (res, rej) {
                item._id = db_tools_1.uniqueID();
                var transaction = db.transaction([constants_1.TODO_OBJECT_STORE_NAME], "readwrite");
                var objectStore = transaction.objectStore(constants_1.TODO_OBJECT_STORE_NAME);
                var request = objectStore.add(item);
                request.onerror = rej;
                request.onsuccess = function () {
                    res(item);
                };
            });
        }).then(function (v) {
            _this.emit('update');
            return v;
        });
    };
    IndexedDBTodoAPI.prototype.u_finishItem = function (id) {
        var _this = this;
        return this.getDB().then(function (db) {
            return new Promise(function (res, rej) {
                var transaction = db.transaction([constants_1.TODO_OBJECT_STORE_NAME], "readwrite");
                var objectStore = transaction.objectStore(constants_1.TODO_OBJECT_STORE_NAME);
                var request = objectStore.get(id);
                request.onerror = rej;
                request.onsuccess = function (event) {
                    res([objectStore, event]);
                };
            });
        }).then(function (_a) {
            var objectStore = _a[0], event = _a[1];
            return new Promise(function (res, rej) {
                var data = event.target.result;
                data.finished = Date.now();
                var requestUpdate = objectStore.put(data);
                requestUpdate.onerror = rej;
                requestUpdate.onsuccess = function () {
                    res(data);
                };
            });
        }).then(function (v) {
            _this.emit('update');
            return v;
        });
    };
    IndexedDBTodoAPI.prototype.d_deleteItem = function (id) {
        var _this = this;
        return this.getDB().then(function (db) {
            return new Promise(function (res, rej) {
                var objectStore = db.transaction([constants_1.TODO_OBJECT_STORE_NAME], "readwrite")
                    .objectStore(constants_1.TODO_OBJECT_STORE_NAME);
                var request = objectStore.get(id);
                request.onerror = rej;
                request.onsuccess = function (event) {
                    res([objectStore, event]);
                };
            });
        }).then(function (_a) {
            var objectStore = _a[0], event = _a[1];
            return new Promise(function (res, rej) {
                var data = event.target.result;
                var requestUpdate = objectStore.delete(id);
                requestUpdate.onerror = rej;
                requestUpdate.onsuccess = function () {
                    res(data);
                };
            });
        }).then(function (v) {
            _this.emit('update');
            return v;
        });
    };
    return IndexedDBTodoAPI;
}());
exports.IndexedDBTodoAPI = IndexedDBTodoAPI;
;
