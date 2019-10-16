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
Object.defineProperty(exports, "__esModule", { value: true });
var ethereum_1 = require("../../../util/ethereum");
var promise_1 = require("../../../util/promise");
var ContractHelper = (function (_super) {
    __extends(ContractHelper, _super);
    function ContractHelper() {
        var _this = _super.call(this) || this;
        _this.args = [];
        return _this;
    }
    ContractHelper.prototype.setArgs = function (web3, contractType, args) {
        this.web3 = web3;
        this.ContractType = contractType;
        this.web3.eth.getAccounts().then(function (accounts) {
            console.log(accounts);
        });
        this.args = args;
        this.setPromise(this.findOrCreateContract());
    };
    ContractHelper.prototype.findOrCreateContract = function () {
        var _this = this;
        return ethereum_1.findContract(this.web3, this.ContractType.evm.bytecode.object).then(function (addresses) {
            if (addresses.length > 0) {
                console.log("found contract");
                return new _this.web3.eth.Contract(_this.ContractType.abi, addresses[0]);
            }
            var newContract = new _this.web3.eth.Contract(_this.ContractType.abi);
            var deployAbleContract = newContract.deploy({
                data: _this.ContractType.evm.bytecode.object,
                arguments: []
            });
            return ethereum_1.tryToSendTransaction(_this.web3, deployAbleContract);
        }).catch(function (err) {
            console.error(err);
            throw err;
        });
    };
    return ContractHelper;
}(promise_1.SingleResultPromise));
exports.ContractHelper = ContractHelper;
;
