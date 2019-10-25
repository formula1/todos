import { TODO_REDUCER_NAME, TODO_ACTIONS, TodoState, TodoAction } from "./constants";

import {
  Todo, TodoInit, ITodoAPI
} from "../../types";

import {
  uniqueID
} from "../../../util/db-tools";


const DEFAULT_STATE: TodoState = {
  api: null,
  creating: false,
  updating: [],
  todos: {}
};


function reducer(state: TodoState = DEFAULT_STATE, action: TodoAction) {
  switch (action.type) {
    case TODO_ACTIONS.SET_API:
      return setAPI(state, action as TodoAction & { api: ITodoAPI } );
    case TODO_ACTIONS.INIT_CREATE:
      return initCreate(state, action as TodoAction & { todo: TodoInit } );
    case TODO_ACTIONS.FINISH_CREATE:
      return finishCreate(state, action as TodoAction & { todo: TodoInit } );
    case TODO_ACTIONS.INIT_UPDATE:
      return initUpdate(state, action as TodoAction & { id: string });
    case TODO_ACTIONS.FINISH_UPDATE:
      return finishUpdate(state, action as TodoAction & { id: string });
    case TODO_ACTIONS.RELOAD_TODOS:
      return reloadTodos(state, action as TodoAction & { todos: { [key: string]: Todo } });
    default:
      return state
  }
}

function setAPI(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { api: ITodoAPI }
){
  return {
    ...state,
    api: action.api
  }
}

function initCreate(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction
){
  return {
    ...state,
    creating: true
  }
}

function finishCreate(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction
){
  return {
    ...state,
    creating: false
  }
}


function initUpdate(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { id: string }
){
  const todos = {
    ...state,
    updating: state.updating.concat([action.id]),
  }
  return todos;
}

function finishUpdate(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { id: string }
){
  const todos = {
    ...state,
    updating: state.updating.filter((id)=>{
      return id != action.id
    }),
  }
  return todos;
}

function reloadTodos(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { todos: { [key: string]: Todo } }
){
  const todos = {
    ...state,
    todos: action.todos
  }
  return todos;
}


export default reducer;
