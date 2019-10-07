import {
  TodoInit
} from "../../types/todo";
import { TODO_ACTIONS, } from "./constants";

export function c_todoCreate(todo: TodoInit){
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

export function u_todoFinish(id: string){
  return {
    type: TODO_ACTIONS.FINISH,
    id: id
  }
}

export function d_todoDelete(id: string){
  return {
    type: TODO_ACTIONS.DELETE,
    id: id
  }
}
