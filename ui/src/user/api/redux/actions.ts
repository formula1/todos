import {
  TodoInit
} from "../../types/interface";
import { TODO_ACTIONS, } from "./constants";

export function c_userCreate(todo: TodoInit){
  return {
    type: TODO_ACTIONS.CREATE,
    todo: {
      created: Date.now(),
      finished: 0,
      description:  "",
      ...todo,
    }
  }
}

export function c_userCreateLogin(todo: TodoInit){
  return {
    type: TODO_ACTIONS.CREATE,
    todo: {
      created: Date.now(),
      finished: 0,
      description:  "",
      ...todo,
    }
  }
}

export function u_userLogin(todo: TodoInit){
  return {
    type: TODO_ACTIONS.CREATE,
    todo: {
      created: Date.now(),
      finished: 0,
      description:  "",
      ...todo,
    }
  }
}

export function d_userDelete(id: string){
  return {
    type: TODO_ACTIONS.DELETE,
    id: id
  }
}

export function d_userDeleteLogin(id: string){
  return {
    type: TODO_ACTIONS.DELETE,
    id: id
  }
}

export function u_userLogout(id: string){
  return {
    type: TODO_ACTIONS.FINISH,
    id: id
  }
}
