"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PROMISE_RESULT;
(function (PROMISE_RESULT) {
    PROMISE_RESULT["PENDING"] = "PENDING";
    PROMISE_RESULT["FAILURE"] = "FAILURE";
    PROMISE_RESULT["SUCCESS"] = "SUCCESS";
})(PROMISE_RESULT || (PROMISE_RESULT = {}));
var SingleResultPromise = (function () {
    function SingleResultPromise(p) {
        this.status = PROMISE_RESULT.PENDING;
        this.waiters = [];
        if (p) {
            this.setPromise(p);
        }
    }
    SingleResultPromise.prototype.setPromise = function (p) {
        var _this = this;
        this.promise = p;
        p.then(function (result) {
            _this.status = PROMISE_RESULT.SUCCESS;
            _this.result = result;
            _this.waiters.forEach(function (waiters) {
                waiters[0](result);
            });
            _this.waiters = [];
        }, function (error) {
            _this.status = PROMISE_RESULT.FAILURE;
            _this.error = error;
            _this.waiters.forEach(function (waiters) {
                waiters[1](error);
            });
            _this.waiters = [];
        });
    };
    SingleResultPromise.prototype.waitForResult = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            switch (_this.status) {
                case PROMISE_RESULT.PENDING:
                    return _this.waiters.push([res, rej]);
                case PROMISE_RESULT.FAILURE:
                    return rej(_this.error);
                case PROMISE_RESULT.SUCCESS:
                    return res(_this.result);
            }
        });
    };
    return SingleResultPromise;
}());
exports.SingleResultPromise = SingleResultPromise;
