import { TODO_ACTIONS, TodoState, TodoAction } from "./constants";

import {
  Todo, TodoInit
} from "../../types/interface";

import {
  uniqueID
} from "../../../util/db-tools";


const DEFAULT_STATE: TodoState = {
  todos: {}
}

function reducer(state: TodoState = DEFAULT_STATE, action: TodoAction) {
  switch (action.type) {
    case TODO_ACTIONS.CREATE:
      return todoCreate(state, action as TodoAction & { todo: TodoInit } );
    case TODO_ACTIONS.FINISH:
      return todoFinish(state, action as TodoAction & { id: string });
    case TODO_ACTIONS.DELETE:
      return todoDelete(state, action as TodoAction & { id: string });
    default:
      return state
  }
}

function todoCreate(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { todo: TodoInit }
){
  const todo: Todo = {
    _id: uniqueID(),
    created: Date.now(),
    finished: 0,
    description:  "",
    ...action.todo
  };
  const todos = {
    ...state.todos,
    [todo._id]: todo,
  }
  return {
    todos: todos
  };
}

function todoFinish(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { id: string }
){
  if(!action.id){
    return state;
  }
  const todo = state.todos[action.id];
  if(!todo.finished){
    todo.finished = Date.now();
  }
  const todos = {
    ...state.todos,
    [todo._id]: todo
  };
  return {
    todos: todos
  }
}

function todoDelete(
  state: TodoState = DEFAULT_STATE,
  action: TodoAction & { id: string }
){
  if(!action.id){
    return state;
  }
  const todos = {
    ...state.todos
  };
  delete todos[action.id];
  return {
    todos: todos
  };
}


export default reducer;
