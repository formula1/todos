
import {
  Todo, TodoInit
} from "../../types/interface";

const USER_REDUCER_NAME = "USER";

enum USER_ACTIONS {
  CREATE = "CREATE",
  CREATE_LOGIN = "CREATE_LOGIN",
  LOGIN = "LOGIN",
  DELETE = "DELETE",
  DELETE_LOGIN = "DELETE_LOGIN",
  LOGOUT = "LOGOUT",
}

type User = { _id: string } & any

interface UserState {
  user: null | User;
}

interface UserAction {
  type: USER_ACTIONS;
  todo?: TodoInit;
  id?: string
}

export { TODO_REDUCER_NAME, TODO_ACTIONS, TodoAction, TodoState }
