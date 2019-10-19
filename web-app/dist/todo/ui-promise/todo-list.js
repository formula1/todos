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
var todo_item_1 = __importDefault(require("./todo-item"));
var react_redux_1 = require("react-redux");
var constants_1 = require("../api/redux-promise/constants");
function TodoListView(props) {
    var d = Date.now();
    return (React.createElement("div", null, props.todos.map(function (key) {
        return (React.createElement(todo_item_1.default, { key: key + " " + d, id: key }));
    })));
}
var mapStateToProps = function (state) { return ({
    todos: Object.keys(state[constants_1.TODO_REDUCER_NAME].todos)
}); };
var mapDispatchToProps = function () { return ({}); };
var TodoList = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TodoListView);
exports.default = TodoList;
