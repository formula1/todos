import {
  FETCH_ACTION,
  FETCH_STATE,
} from "../../util/fetch";

const USER_REDUCER_NAME = "USER";

enum USER_ACTIONS {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  DELETE = "DELETE"
}

type User = { id: string } & any

interface UserState {
  user?: User | null;
  fetch: FETCH_STATE;
}

interface UserAction {
  user?: User
  type: USER_ACTIONS;
  fetch: FETCH_ACTION;
}



export { USER_REDUCER_NAME, USER_ACTIONS, UserAction, UserState }
