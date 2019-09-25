
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

interface TodoAction {
  type: TODO_ACTIONS;
  todo?: TodoInit;
  id?: string
}

export { TODO_REDUCER_NAME, TODO_ACTIONS, TodoAction, TodoState }
