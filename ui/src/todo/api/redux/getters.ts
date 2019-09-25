import { TODO_REDUCER_NAME, TodoState } from "./constants";

export function r_todoIds(state: {[TODO_REDUCER_NAME]: TodoState }){
  return Object.keys(state[TODO_REDUCER_NAME])
}

export function r_todo(state: {[TODO_REDUCER_NAME]: TodoState }, id: string){
  return state[TODO_REDUCER_NAME][id];
}
