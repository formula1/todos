
import {
  Todo, TodoInit, ITodoAPI
} from "../../types/todo";

const TODO_REDUCER_NAME = "TODO";

enum TODO_ACTIONS {
  SET_API = "SET_API",
  INIT_CREATE = "INIT_CREATE",
  FINISH_CREATE = "FINISH_CREATE",
  INIT_UPDATE = "INIT_UPDATE",
  FINISH_UPDATE = "FINISH_UPDATE",
  RELOAD_TODOS = "RELOAD_TODOS"
}

interface TodoState {
  api: null | ITodoAPI,
  creating: boolean,
  updating: Array<string>,
  todos: {
    [_id: string]: Todo
  }
};


type TodoAction = {
  type: TODO_ACTIONS.SET_API,
  api: ITodoAPI
} | {
  type: TODO_ACTIONS.INIT_CREATE,
} | {
  type: TODO_ACTIONS.FINISH_CREATE,
} | {
  type: TODO_ACTIONS.INIT_UPDATE,
  id: string
} | {
  type: TODO_ACTIONS.FINISH_UPDATE,
  id: string
} | {
  type: TODO_ACTIONS.RELOAD_TODOS,
  todos: {
    [_id: string]: Todo
  }
};

export { TODO_REDUCER_NAME, TODO_ACTIONS, TodoAction, TodoState }
