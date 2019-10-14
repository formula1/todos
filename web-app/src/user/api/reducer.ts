import { USER_ACTIONS, UserState, UserAction } from "./constants";
import { FETCH_STATUS } from "../../util/fetch";

const DEFAULT_STATE: UserState = {
  user: null,
  fetch: {
    id: null
  }
}

function reducer(state: UserState = DEFAULT_STATE, action: UserAction) {
  switch (action.type) {
    case USER_ACTIONS.REGISTER:
      return registerReducer(state, action);
    case USER_ACTIONS.LOGIN:
      return loginReducer(state, action);
    case USER_ACTIONS.LOGOUT:
      return logoutReducer(state, action);
    case USER_ACTIONS.DELETE:
      return deleteReducer(state, action);
    default:
      return state
  }
}

function registerReducer(state: UserState, action: UserAction){
  if(action.fetch.status === FETCH_STATUS.INIT){
    if(state.fetch.id !== null){
      return state;
    }
    return {
      ...state,
      fetch: {
        id: action.fetch.id
      }
    }
  }
  if(state.fetch.id !== action.fetch.id){
    return state;
  }
  switch (action.fetch.status) {
    case FETCH_STATUS.SUCCESS:
      return {
        ...state,
        user: action.user,
        fetch: {
          id: null
        }
      }
    case FETCH_STATUS.ERROR:
      return {
        ...state,
        fetch: {
          id: null
        }
      }
  }
}
function loginReducer(state: UserState, action: UserAction){
  if(action.fetch.status === FETCH_STATUS.INIT){
    if(state.fetch.id !== null){
      return state;
    }
    return {
      ...state,
      fetch: {
        id: action.fetch.id
      }
    }
  }
  if(state.fetch.id !== action.fetch.id){
    return state;
  }
  switch (action.fetch.status) {
    case FETCH_STATUS.SUCCESS:
      return {
        ...state,
        user: action.user,
        fetch: {
          id: null
        }
      }
    case FETCH_STATUS.ERROR:
      return {
        ...state,
        fetch: {
          id: null
        }
      }
  }
}
function logoutReducer(state: UserState, action: UserAction){
  if(action.fetch.status === FETCH_STATUS.INIT){
    if(state.fetch.id !== null){
      return state;
    }
    return {
      ...state,
      fetch: {
        id: action.fetch.id
      }
    }
  }
  if(state.fetch.id !== action.fetch.id){
    return state;
  }
  switch (action.fetch.status) {
    case FETCH_STATUS.SUCCESS:
      return {
        ...state,
        user: null,
        fetch: {
          id: null
        }
      }
    case FETCH_STATUS.ERROR:
      return {
        ...state,
        fetch: {
          id: null
        }
      }
  }
}
function deleteReducer(state: UserState, action: UserAction){
  if(action.fetch.status === FETCH_STATUS.INIT){
    if(state.fetch.id !== null){
      return state;
    }
    return {
      ...state,
      fetch: {
        id: action.fetch.id
      }
    }
  }
  if(state.fetch.id !== action.fetch.id){
    return state;
  }
  switch (action.fetch.status) {
    case FETCH_STATUS.SUCCESS:
      return {
        ...state,
        user: null,
        fetch: {
          id: null
        }
      }
    case FETCH_STATUS.ERROR:
      return {
        ...state,
        fetch: {
          id: null
        }
      }
  }
}


export default reducer;
