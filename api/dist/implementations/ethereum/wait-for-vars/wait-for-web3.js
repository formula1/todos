"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethereum_1 = require("../../../util/ethereum");
function waitForWeb3Users(win, url) {
    return Promise.resolve().then(function () {
        if (typeof win.ethereum) {
            var web3_1 = new ethereum_1.Web3(win.ethereum);
            return win.ethereum.enable().then(function (accounts) {
                console.log(accounts);
                return web3_1;
            });
        }
        alert("This Application currently only works with MetaMask: https://metamask.io/");
        var web3 = win.web3 ? win.web3 : new ethereum_1.Web3(url);
        web3.currentProvider.publicConfigStore.on('update', function (update) {
            console.log(update);
        });
        return web3;
    });
}
exports.waitForWeb3Users = waitForWeb3Users;
