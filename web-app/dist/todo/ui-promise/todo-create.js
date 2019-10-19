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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var JSON_1 = require("../../util/JSON");
var actions_1 = require("../api/redux-promise/actions");
var DEFAULT_STATE = {
    value: ""
};
var TodoCreateView = (function (_super) {
    __extends(TodoCreateView, _super);
    function TodoCreateView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = JSON_1.JSONcopy(DEFAULT_STATE);
        return _this;
    }
    TodoCreateView.prototype.render = function () {
        var _this = this;
        var state = this.state;
        var onCreate = this.props.onCreate;
        return (React.createElement("div", null,
            React.createElement("input", { type: "text", value: state.value, onChange: function (event) { _this.setState({ value: event.target.value }); } }),
            React.createElement("button", { onClick: function () {
                    onCreate({
                        description: state.value,
                        created: Date.now(),
                        finished: 0,
                    });
                    _this.setState(JSON_1.JSONcopy(DEFAULT_STATE));
                } }, "Create")));
    };
    return TodoCreateView;
}(React.Component));
var mapStateToProps = function () { return ({}); };
var mapDispatchToProps = function (dispatch) { return ({
    onCreate: function (value) { return (dispatch(actions_1.c_todoCreate(value))); },
}); };
var TodoCreate = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TodoCreateView);
exports.default = TodoCreate;
