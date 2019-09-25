
import {
  Todo, TodoInit
} from "../../types/interface";

const TODO_REDUCER_NAME = "TODO";

enum TODO_ACTIONS {
  CREATE = "CREATE",
  FINISH = "FINISH",
  DELETE = "DELETE"
}

interface TodoState {
  [_id: string]: Todo
};


type TodoAction = {
  type: TODO_ACTIONS.CREATE,
  todo: TodoInit
} | {
  type: TODO_ACTIONS.FINISH,
  id: string
} | {
  type: TODO_ACTIONS.DELETE,
  id: string
};

export { TODO_REDUCER_NAME, TODO_ACTIONS, TodoAction, TodoState }
