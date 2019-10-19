"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var DEFAULT_STATE = {
    toggled: false,
    children: void 0
};
function reducer(state, action) {
    if (state === void 0) { state = DEFAULT_STATE; }
    switch (action.type) {
        case constants_1.LIGHTBOX_ACTIONS.ENABLE:
            return {
                toggled: true,
                children: action.children
            };
        case constants_1.LIGHTBOX_ACTIONS.DISABLE:
            return {
                toggled: false,
                children: void 0
            };
        default:
            return state;
    }
}
exports.default = reducer;
