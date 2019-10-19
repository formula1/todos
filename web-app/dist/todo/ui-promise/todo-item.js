"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var react_redux_1 = require("react-redux");
var actions_1 = require("../api/redux-promise/actions");
var constants_1 = require("../api/redux-promise/constants");
function TodoItemView(props) {
    var item = props.item;
    console.log(props, item);
    return (React.createElement("div", null,
        React.createElement("div", { className: "todo-header" },
            React.createElement("div", { className: "todo-dates" },
                React.createElement("div", { className: "todo-date-created" }, moment_1.default(item.created).toString()),
                React.createElement("div", { className: "todo-date-finished-" + !!item.finished, onClick: !item.finished ? function () { props.onFinish(item._id); } : null }, item.finished ? moment_1.default(item.finished).toString() : "finish")),
            React.createElement("div", { className: "todo-delete", onClick: function () {
                    props.onDelete(item._id);
                } }, "X")),
        React.createElement("div", { className: "todo-description" }, item.description)));
}
var mapStateToProps = function (state, props) {
    console.log(props);
    return {
        item: state[constants_1.TODO_REDUCER_NAME].todos[props.id]
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    onFinish: function (id) { return (dispatch(actions_1.u_todoFinish(id))); },
    onDelete: function (id) { return (dispatch(actions_1.d_todoDelete(id))); }
}); };
var TodoItem = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TodoItemView);
exports.default = TodoItem;
