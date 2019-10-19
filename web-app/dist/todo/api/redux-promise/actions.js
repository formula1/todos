"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var constants_2 = require("./constants");
function api_setAPI(api) {
    return {
        type: constants_1.TODO_ACTIONS.SET_API,
        api: api
    };
}
exports.api_setAPI = api_setAPI;
function r_listTodos(todos) {
    var todoObj = todos.reduce(function (obj, todo) {
        obj[todo._id] = todo;
        return obj;
    }, {});
    return {
        type: constants_1.TODO_ACTIONS.RELOAD_TODOS,
        todos: todoObj
    };
}
exports.r_listTodos = r_listTodos;
function c_todoCreate(todo) {
    return function (dispatch, getState) {
        var todoState = getState()[constants_2.TODO_REDUCER_NAME];
        if (!todoState.api) {
            throw new Error(constants_2.TODO_REDUCER_NAME + " needs an api");
        }
        if (todoState.creating) {
            throw new Error(constants_2.TODO_REDUCER_NAME + " is currently creating");
        }
        dispatch({
            type: constants_1.TODO_ACTIONS.INIT_CREATE,
        });
        return todoState.api.c_createItem({
            created: todo.created || Date.now(),
            finished: 0,
            description: todo.description || "",
        }).then(function () {
            dispatch({
                type: constants_1.TODO_ACTIONS.FINISH_CREATE,
            });
        }, function (error) {
            console.error(error);
            dispatch({
                type: constants_1.TODO_ACTIONS.FINISH_CREATE,
            });
        });
    };
}
exports.c_todoCreate = c_todoCreate;
function u_todoFinish(id) {
    return function (dispatch, getState) {
        var todoState = getState()[constants_2.TODO_REDUCER_NAME];
        initUpdate(id, dispatch, todoState);
        return todoState.api.u_finishItem(id).then(function () {
            dispatch({
                type: constants_1.TODO_ACTIONS.FINISH_UPDATE,
                id: id
            });
        }, function (error) {
            console.error(error);
            dispatch({
                type: constants_1.TODO_ACTIONS.FINISH_UPDATE,
                id: id
            });
        });
    };
}
exports.u_todoFinish = u_todoFinish;
function d_todoDelete(id) {
    return function (dispatch, getState) {
        var todoState = getState()[constants_2.TODO_REDUCER_NAME];
        initUpdate(id, dispatch, todoState);
        return todoState.api.d_deleteItem(id).then(function () {
            dispatch({
                type: constants_1.TODO_ACTIONS.FINISH_UPDATE,
                id: id
            });
        }, function (error) {
            console.error(error);
            dispatch({
                type: constants_1.TODO_ACTIONS.FINISH_UPDATE,
                id: id
            });
        });
    };
}
exports.d_todoDelete = d_todoDelete;
function initUpdate(id, dispatch, todoState) {
    if (!todoState.api) {
        throw new Error(constants_2.TODO_REDUCER_NAME + " needs an api");
    }
    if (todoState.updating.some(function (value) {
        return id === value;
    })) {
        throw new Error(constants_2.TODO_REDUCER_NAME + " " + id + " is currently updating");
    }
    dispatch({
        type: constants_1.TODO_ACTIONS.INIT_UPDATE,
        id: id
    });
}
