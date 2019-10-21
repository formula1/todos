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
var ReactDOM = __importStar(require("react-dom"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_2 = require("./util/redux");
var todo_1 = require("./todo/ui-promise/todo");
var constants_1 = require("./todo/api/redux-promise/constants");
var reducer_1 = __importDefault(require("./todo/api/redux-promise/reducer"));
var actions_1 = require("./todo/api/redux-promise/actions");
var constants_2 = require("./util/ui/lightbox/redux/constants");
var reducer_2 = __importDefault(require("./util/ui/lightbox/redux/reducer"));
var lightbox_1 = require("./util/ui/lightbox/lightbox");
var todo_apis_1 = require("todo-apis");
console.log("before load");
console.log(window.web3);
function initRun() {
    var _a;
    var store = redux_2.makeStore(redux_1.combineReducers((_a = {},
        _a[constants_1.TODO_REDUCER_NAME] = reducer_1.default,
        _a[constants_2.LIGHTBOX_REDUCER_NAME] = reducer_2.default,
        _a)));
    var api = new todo_apis_1.WebWorkerTodoAPI();
    function updateTodos() {
        api.r_All().then(function (items) {
            console.log("dispatching update", items);
            store.dispatch(actions_1.r_listTodos(items));
        }).catch(function (error) {
            console.error("requesting all/", error);
        });
    }
    api.on("update", function () {
        console.log("retrieving_all");
        updateTodos();
    });
    store.dispatch(actions_1.api_setAPI(api));
    updateTodos();
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement("div", null,
            React.createElement(todo_1.TodoPage, null),
            React.createElement(lightbox_1.LightBoxRedux, null))), document.querySelector("#init"));
}
exports.initRun = initRun;
if (require.main === module) {
    initRun();
}
