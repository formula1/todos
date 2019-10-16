"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB_NAME = "TodoLocal";
exports.DB_NAME = DB_NAME;
var DB_VERSION = 1;
exports.DB_VERSION = DB_VERSION;
var TODO_OBJECT_STORE_NAME = "TODO";
exports.TODO_OBJECT_STORE_NAME = TODO_OBJECT_STORE_NAME;
var dbUpgrades = {
    0: function (db) {
        db.createObjectStore(TODO_OBJECT_STORE_NAME, { keyPath: "_id" });
    }
};
exports.dbUpgrades = dbUpgrades;
var getDbArgs = {
    name: DB_NAME,
    version: DB_VERSION,
    upgradeFns: dbUpgrades
};
exports.getDbArgs = getDbArgs;
