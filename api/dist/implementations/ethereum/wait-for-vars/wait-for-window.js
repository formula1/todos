"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("../../../util/promise");
function waitForWindow() {
    return promise_1.Promise.race([
        new promise_1.Promise(function (res, rej) {
            if (document.readyState === "complete") {
                return res(window);
            }
            function loadListener() {
                window.removeEventListener("load", loadListener);
                res(window);
            }
            window.addEventListener("load", loadListener);
        }),
        new promise_1.Promise(function (res, rej) {
            setTimeout(function () { rej(new Error("timeout")); }, 10 * 1000);
        })
    ]);
}
exports.waitForWindow = waitForWindow;
