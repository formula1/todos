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
var todo_list_1 = __importDefault(require("./todo-list"));
var todo_create_1 = __importDefault(require("./todo-create"));
function TodoPage() {
    return (React.createElement("div", null,
        React.createElement(todo_list_1.default, null),
        React.createElement(todo_create_1.default, null)));
}
exports.TodoPage = TodoPage;
