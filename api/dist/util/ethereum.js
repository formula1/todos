"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = __importDefault(require("web3"));
exports.Web3 = web3_1.default;
var big_number_1 = require("./big-number");
var EC_DEBUG = "ETHEREUM_CONTRACT:";
function findContract(web3, contractCode) {
    return Promise.resolve().then(function () {
        return web3.eth.getBlockNumber();
    }).then(function (blockNumber) {
        console.log(EC_DEBUG, "TOTAL BLOCKNUMBER", blockNumber);
        var blocks = [];
        for (var i = 0; i <= blockNumber; i++) {
            blocks.push(getTestTransactionsFromBlock(i, contractCode));
        }
        return Promise.all(blocks);
    }).then(function (contractsAddresses) {
        var addresses = contractsAddresses.reduce(function (allAddresses, blockAddresses) {
            return allAddresses.concat(blockAddresses);
        }, []);
        console.log("found addresses:", addresses);
        return addresses;
    });
    function getTestTransactionsFromBlock(blockNumber, contractCode) {
        return web3.eth.getBlockTransactionCount(blockNumber).then(function (transCount) {
            console.log(EC_DEBUG, "blockNumber:", blockNumber, ", TOTAL TRANSACTION COUNT:", transCount);
            var ps = [];
            for (var i = 0; i < transCount; i++) {
                ps.push(getAndTestTransaction(blockNumber, i, contractCode));
            }
            return Promise.all(ps);
        }).then(function (resolvedPromises) {
            return (resolvedPromises.filter(function (value) {
                console.log("test transaction", value);
                return value != false;
            }));
        });
    }
    function getAndTestTransaction(blockNumber, transCount, contractCode) {
        return Promise.resolve().then(function () {
            return web3.eth.getTransactionFromBlock(blockNumber, transCount);
        }).then(function (transactionInfo) {
            if (transactionInfo.input === "0x") {
                console.log(EC_DEBUG, "blockNumber:", blockNumber, ", transactionCount:", transCount, "TRANSACTION HAS NO DATA");
                return false;
            }
            if (transactionInfo.to !== null) {
                console.log(EC_DEBUG, "blockNumber:", blockNumber, ", transactionCount:", transCount, "TRANSACTION SENDS VALUE TO TARGET");
                return false;
            }
            return web3.eth.getTransactionReceipt(transactionInfo.hash).then(function (reciept) {
                console.log(EC_DEBUG, "blockNumber:", blockNumber, ", transactionCount:", transCount, "transactionReciept: ", reciept);
                if (!reciept.contractAddress) {
                    console.log(EC_DEBUG, "blockNumber:", blockNumber, ", transactionCount:", transCount, "transaction HAS NOT CONTRACT ADDRESS");
                    return false;
                }
                return web3.eth.getCode(reciept.contractAddress).then(function (code) {
                    console.log(EC_DEBUG, "blockNumber:", blockNumber, ", transactionCount:", transCount, "transactionCode: ", code);
                    if (code.substring(2) !== contractCode.substring(64)) {
                        console.log("TRANSACTION CODE IS DIFFERENT:", code, "0x" + contractCode);
                        window.ORIGINAL_CODE = contractCode;
                        window.NEW_CODE = code.substring(2);
                        return false;
                    }
                    console.log("code is the same");
                    return reciept.contractAddress;
                });
            });
        });
    }
}
exports.findContract = findContract;
function tryToSendTransaction(web3, transaction) {
    console.log("attempting to send");
    return Promise.all([
        transaction.estimateGas({ gas: 5000000000 }).then(function (gas) {
            console.log("estimated gas:", gas);
            return gas;
        }, function (error) {
            console.error("error on estimate gas");
            throw error;
        }),
        web3.eth.getGasPrice(),
        web3.eth.getAccounts().then(function (accounts) {
            return web3.eth.getBalance(accounts[0]).then(function (balance) {
                return [accounts[0], balance];
            });
        }),
    ]).then(function (_a) {
        var gas = _a[0], gasPrice = _a[1], accountAndBalance = _a[2];
        var account = accountAndBalance[0];
        var balance = new big_number_1.BigNumber(accountAndBalance[1]);
        var gasCost = new big_number_1.BigNumber(gasPrice).multipliedBy(gas);
        var diff = balance.isGreaterThanOrEqualTo(gasCost);
        console.log("Transcaction Attempt:", balance, gasCost);
        if (!diff) {
            throw new Error("account balance: " + balance.toString(10) + " is less than cost of contract: " + gasCost.toString(10));
        }
        return transaction.send({
            gas: gas,
            from: account
        });
    });
}
exports.tryToSendTransaction = tryToSendTransaction;
