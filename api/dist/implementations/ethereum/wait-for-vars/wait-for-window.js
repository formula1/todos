"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waitForWindow() {
    return Promise.race([
        new Promise(function (res, rej) {
            if (document.readyState === "complete") {
                return res(window);
            }
            function loadListener() {
                window.removeEventListener("load", loadListener);
                res(window);
            }
            window.addEventListener("load", loadListener);
        }),
        new Promise(function (res, rej) {
            setTimeout(function () { rej(new Error("timeout")); }, 10 * 1000);
        })
    ]);
}
exports.waitForWindow = waitForWindow;
