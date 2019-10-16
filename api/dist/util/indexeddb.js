"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("./promise");
var indexedDB = (window.indexedDB
    || window.mozIndexedDB
    || window.webkitIndexedDB
    || window.msIndexedDB);
exports.indexedDB = indexedDB;
var INDEXED_DB_STATUS;
(function (INDEXED_DB_STATUS) {
    INDEXED_DB_STATUS["INIT"] = "INIT";
    INDEXED_DB_STATUS["SUCCESS"] = "SUCCESS";
    INDEXED_DB_STATUS["ERROR"] = "ERROR";
})(INDEXED_DB_STATUS || (INDEXED_DB_STATUS = {}));
exports.INDEXED_DB_STATUS = INDEXED_DB_STATUS;
if (!indexedDB) {
    console.error("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
function upgradeDB(_a) {
    var request = _a.request, event = _a.event, upgradeFns = _a.upgradeFns;
    var db = request.result;
    var prevVersion = event.oldVersion;
    var curVersion = event.newVersion;
    while (prevVersion < curVersion) {
        console.log(prevVersion, curVersion);
        upgradeFns[prevVersion](db);
        prevVersion++;
    }
}
function getDatabase(_a) {
    var name = _a.name, version = _a.version, upgradeFns = _a.upgradeFns;
    return new promise_1.Promise(function (res, rej) {
        var request = indexedDB.open(name, version);
        request.onerror = rej;
        request.onupgradeneeded = function (event) {
            upgradeDB({ request: request, event: event, upgradeFns: upgradeFns });
        };
        request.onsuccess = function (e) {
            res(e.target.result);
        };
    });
}
exports.getDatabase = getDatabase;
