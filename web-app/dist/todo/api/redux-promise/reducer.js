"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var DEFAULT_STATE = {
    api: null,
    creating: false,
    updating: [],
    todos: {}
};
function reducer(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    switch (action.type) {
        case constants_1.TODO_ACTIONS.SET_API:
            return setAPI(state, action);
        case constants_1.TODO_ACTIONS.INIT_CREATE:
            return initCreate(state, action);
        case constants_1.TODO_ACTIONS.FINISH_CREATE:
            return finishCreate(state, action);
        case constants_1.TODO_ACTIONS.INIT_UPDATE:
            return initUpdate(state, action);
        case constants_1.TODO_ACTIONS.FINISH_UPDATE:
            return finishUpdate(state, action);
        case constants_1.TODO_ACTIONS.RELOAD_TODOS:
            return reloadTodos(state, action);
        default:
            return state;
    }
}
function setAPI(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    return __assign(__assign({}, state), { api: action.api });
}
function initCreate(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    return __assign(__assign({}, state), { creating: true });
}
function finishCreate(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    return __assign(__assign({}, state), { creating: false });
}
function initUpdate(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    var todos = __assign(__assign({}, state), { updating: state.updating.concat([action.id]) });
    return todos;
}
function finishUpdate(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    var todos = __assign(__assign({}, state), { updating: state.updating.filter(function (id) {
            return id != action.id;
        }) });
    return todos;
}
function reloadTodos(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    var todos = __assign(__assign({}, state), { todos: action.todos });
    return todos;
}
exports.default = reducer;
