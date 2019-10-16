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
var ethereum_1 = require("../../util/ethereum");
var events_1 = require("../../util/events");
var promise_1 = require("../../util/promise");
var TodoSol = require("../../../contracts/todo.sol");
console.log(TodoSol);
var TodoListsContract = TodoSol.contracts["todo.sol"].TodoLists;
console.log(TodoListsContract);
var wait_for_contract_1 = require("./wait-for-vars/wait-for-contract");
var wait_for_window_1 = require("./wait-for-vars/wait-for-window");
var wait_for_web3_1 = require("./wait-for-vars/wait-for-web3");
var EthTodoAPI = (function (_super) {
    __extends(EthTodoAPI, _super);
    function EthTodoAPI(args) {
        var _this = _super.call(this) || this;
        _this.ContractType = TodoListsContract;
        console.log(Object.keys(window));
        _this.web3Resolver = new promise_1.SingleResultPromise(wait_for_window_1.waitForWindow().then(function (win) {
            return wait_for_web3_1.waitForWeb3Users(win, args.url);
        }));
        _this.contractResolver = new wait_for_contract_1.ContractHelper();
        _this.contractResolver.waitForResult().then(function (contract) {
            contract.events.ChangeEvent().on("data", function () {
                console.log("new update event from contract");
                _this.emit("update");
            });
            _this.r_Count();
        });
        _this.web3Resolver.waitForResult().then(function (web3) {
            _this.web3 = web3;
            _this.contractResolver.setArgs(web3, TodoListsContract, []);
        });
        _this.web3Resolver.waitForResult().then(function (web3) {
            _this.web3.currentProvider.publicConfigStore.on('update', function (update) {
                console.log("configure event");
            });
        });
        _this.on("update", function () {
            console.log("updating");
        });
        return _this;
    }
    EthTodoAPI.prototype.deconstruct = function () {
        this.event.removeAllListeners("data")(this.web3).currentProvider.publicConfigStore.removeAllListeners();
    };
    EthTodoAPI.prototype.r_Count = function () {
        console.log("ASK FOR COUNT");
        return this.contractResolver.waitForResult().then(function (contract) {
            console.log("go contract:", contract);
            return contract.methods.requestItemCount().call();
        }).then(function (result) {
            console.log("Count:", result);
            return parseInt(result);
        });
    };
    EthTodoAPI.prototype.r_List = function () {
        return Promise.all([
            this.r_Count(),
            this.contractResolver.waitForResult()
        ]).then(function (_a) {
            var count = _a[0], contract = _a[1];
            console.log("typeof:", typeof count);
            if (count === 0)
                return [];
            var uids = [];
            for (var i = 0; i < count; i++) {
                uids.push(contract.methods.allTodos(i).call());
            }
            return Promise.all(uids);
        });
    };
    EthTodoAPI.prototype.r_Single = function (id) {
        console.log("LOADING SINGLE ID:", id);
        return this.contractResolver.waitForResult().then(function (contract) {
            return contract.methods.requestItemSingle(id).call();
        }).then(function (result) {
            console.log("SINGLE:", result);
            return {
                created: parseInt(result.created) * 1000,
                finished: parseInt(result.finished) * 1000,
                description: result.description,
                owner: result.owner,
                _id: result._id
            };
        });
    };
    EthTodoAPI.prototype.r_All = function () {
        var _this = this;
        return this.r_List().then(function (list) {
            return Promise.all(list.map(function (id) {
                return _this.r_Single(id);
            }));
        });
    };
    EthTodoAPI.prototype.c_createItem = function (item) {
        return Promise.all([
            this.web3Resolver.waitForResult(),
            this.contractResolver.waitForResult()
        ]).then(function (_a) {
            var web3 = _a[0], contract = _a[1];
            return ethereum_1.tryToSendTransaction(web3, contract.methods.createItem(item.description));
        }).catch(function (error) {
            console.error(error);
            throw error;
        });
    };
    EthTodoAPI.prototype.u_finishItem = function (id) {
        console.log("attempting to finish:", id);
        return Promise.all([
            this.web3Resolver.waitForResult(),
            this.contractResolver.waitForResult()
        ]).then(function (_a) {
            var web3 = _a[0], contract = _a[1];
            return ethereum_1.tryToSendTransaction(web3, contract.methods.uFinishItem(parseInt(id))).catch(function (e) {
                console.error(e);
                throw e;
            });
        });
    };
    EthTodoAPI.prototype.d_deleteItem = function (id) {
        return Promise.all([
            this.web3Resolver.waitForResult(),
            this.contractResolver.waitForResult()
        ]).then(function (_a) {
            var web3 = _a[0], contract = _a[1];
            return ethereum_1.tryToSendTransaction(web3, contract.methods.deleteItem(id));
        });
    };
    return EthTodoAPI;
}(events_1.EventEmitter));
exports.EthTodoAPI = EthTodoAPI;
;
