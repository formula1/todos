"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
exports.fetch = isomorphic_fetch_1.default;
function handleResponse(response) {
    return response.json().then(function (json) {
        console.log(response);
        console.log(json);
        if (response.ok) {
            return json;
        }
        throw json;
    });
}
exports.handleResponse = handleResponse;
function jsonToFormData(json) {
    var formData = new FormData();
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        formData.set(key, json[key]);
    });
    return formData;
}
exports.jsonToFormData = jsonToFormData;
var FETCH_STATUS;
(function (FETCH_STATUS) {
    FETCH_STATUS["INIT"] = "INIT";
    FETCH_STATUS["SUCCESS"] = "SUCCESS";
    FETCH_STATUS["ERROR"] = "ERROR";
})(FETCH_STATUS || (FETCH_STATUS = {}));
exports.FETCH_STATUS = FETCH_STATUS;
