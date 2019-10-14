import {
  FETCH_STATUS
} from "../../util/fetch";

import {
  UserAction,
  UserState,
  USER_ACTIONS,
  USER_REDUCER_NAME
} from "./constants";

import {
  ForiegnUserApi
} from "./foreign-api";

import {
  UserFormRegister,
  UserFormLogin
} from "../types/UserForm"

import {
  uniqueID
} from "../../util/db-tools";

export const REQUEST_POSTS = 'REQUEST_POSTS'

function registerUser(api: ForiegnUserApi, form: UserFormRegister){
  return function(
    dispatch: (action: UserAction)=>any,
    getState: ()=>{ [USER_REDUCER_NAME]: UserState }
  ) {
    const user = getState()[USER_REDUCER_NAME];
    if(user.fetch.id !== null){
      throw new Error("Currently changing user");
    }
    if(user.user){
      throw new Error("Currently logged in as a user");
    }
    const id = uniqueID();
    const initRegister: UserAction = {
      fetch: {
        id: id,
        status: FETCH_STATUS.INIT
      },
      type: USER_ACTIONS.REGISTER,
    };
    dispatch(initRegister);
    return api.registerUser(form).then((json)=>{
      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.SUCCESS
        },
        type: USER_ACTIONS.REGISTER,
        user: json
      })
    }).catch((error)=>{
      console.error(error);
      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.ERROR
        },
        type: USER_ACTIONS.REGISTER,
      })
    })
  }
}

function loginUser(api: ForiegnUserApi, form: UserFormLogin){
  return function(
    dispatch: (action: UserAction)=>any,
    getState: ()=>{ [USER_REDUCER_NAME]: UserState }
  ) {
    const user = getState()[USER_REDUCER_NAME];
    if(user.fetch.id !== null){
      throw new Error("Currently changing user");
    }
    if(user.user){
      throw new Error("Currently logged in as a user");
    }
    const id = uniqueID();
    const initRegister: UserAction = {
      fetch: {
        id: id,
        status: FETCH_STATUS.INIT
      },
      type: USER_ACTIONS.LOGIN,
    };
    dispatch(initRegister);
    return api.loginUser(form).then((json)=>{
      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.SUCCESS
        },
        type: USER_ACTIONS.LOGIN,
        user: json
      })
    }
    ).catch((error)=>{
      console.error(error);
      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.ERROR
        },
        type: USER_ACTIONS.LOGIN,
      })
    })
  }
}

function logoutUser(api: ForiegnUserApi){
  return function(
    dispatch: (action: UserAction)=>any,
    getState: ()=>{ [USER_REDUCER_NAME]: UserState }
  ) {
    const user = getState()[USER_REDUCER_NAME];
    if(user.fetch.id !== null){
      throw new Error("Currently changing user");
    }
    if(!user.user){
      throw new Error("Not currently logged in");
    }
    const id = uniqueID();
    const initRegister: UserAction = {
      fetch: {
        id: id,
        status: FETCH_STATUS.INIT
      },
      type: USER_ACTIONS.LOGOUT,
    };
    dispatch(initRegister);
    return api.logoutUser().then(json =>

      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.SUCCESS
        },
        type: USER_ACTIONS.LOGOUT,
        user: json
      })
    ).catch((error)=>{
      console.error(error);
      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.ERROR
        },
        type: USER_ACTIONS.LOGOUT,
      })
    })
  }
}

function deleteUser(api: ForiegnUserApi){
  return function(
    dispatch: (action: UserAction)=>any,
    getState: ()=>{ [USER_REDUCER_NAME]: UserState }
  ) {
    const user = getState()[USER_REDUCER_NAME];
    if(user.fetch.id !== null){
      throw new Error("Currently changing user");
    }
    if(!user.user){
      throw new Error("Not currently logged in");
    }
    const id = uniqueID();
    const initRegister: UserAction = {
      fetch: {
        id: id,
        status: FETCH_STATUS.INIT
      },
      type: USER_ACTIONS.DELETE,
    };
    dispatch(initRegister);
    return api.deleteUser().then(json =>

      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.SUCCESS
        },
        type: USER_ACTIONS.DELETE,
        user: json
      })
    ).catch((error)=>{
      console.error(error);
      dispatch({
        fetch: {
          id: id,
          status: FETCH_STATUS.ERROR
        },
        type: USER_ACTIONS.DELETE,
      })
    })
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser
};
