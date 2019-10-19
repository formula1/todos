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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var center_1 = require("../css/center");
var full_page_1 = require("../css/full-page");
var react_redux_1 = require("react-redux");
var constants_1 = require("./redux/constants");
function LightBox(props) {
    if (!props.toggled) {
        return null;
    }
    return (React.createElement("div", { style: (__assign(__assign({}, full_page_1.FullPageFollowScroll), { backgroundColor: "rgba(0, 0, 0, 0.3);" })) },
        React.createElement("div", { style: center_1.CenterChild }, React.Children.toArray(props.children))));
}
exports.LightBox = LightBox;
var mapStateToProps = function (state) {
    return {
        toggled: state[constants_1.LIGHTBOX_REDUCER_NAME].toggled,
        children: state[constants_1.LIGHTBOX_REDUCER_NAME].children
    };
};
var mapDispatchToProps = function (dispatch) { return ({}); };
var LightBoxRedux = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LightBox);
exports.LightBoxRedux = LightBoxRedux;
