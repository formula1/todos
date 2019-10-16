"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB_NAME = "TodoLocal";
var DB_VERSION = 1;
var TODO_OBJECT_STORE_NAME = "TODO";
exports.TODO_OBJECT_STORE_NAME = TODO_OBJECT_STORE_NAME;
var dbUpgrades = {
    0: function (db) {
        db.createObjectStore(TODO_OBJECT_STORE_NAME, { keyPath: "_id" });
    }
};
var getDbArgs = {
    name: DB_NAME,
    version: DB_VERSION,
    upgradeFns: dbUpgrades
};
exports.getDbArgs = getDbArgs;
