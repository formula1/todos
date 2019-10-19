"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i = 0;
function uniqueID() {
    return (Date.now().toString(32)
        + i.toString(32)
        + Math.random().toString(32).substring(2));
}
exports.uniqueID = uniqueID;
