import {
  TodoInit, Todo, ITodoAPI
} from "../../types/interface";
import { TODO_ACTIONS, } from "./constants";
import { TODO_REDUCER_NAME, TodoState } from "./constants";

// only one update at a time
// listener to update the values

export function api_setAPI(api: ITodoAPI){
  return {
    type: TODO_ACTIONS.SET_API,
    api: api
  }
}

export function r_listTodos(todos: Array<Todo>){
  const todoObj = todos.reduce((obj: { [id: string]: Todo }, todo: Todo)=>{
    obj[todo._id] = todo;
    return obj;
  }, {})
  return {
    type: TODO_ACTIONS.RELOAD_TODOS,
    todos: todoObj
  }
}

type Dispatch = (value: {})=>any
type GetState = ()=>{ [TODO_REDUCER_NAME]: TodoState }

export function c_todoCreate(todo: TodoInit){
  return (dispatch: Dispatch, getState: GetState) => {
    const todoState = getState()[TODO_REDUCER_NAME];
    if(!todoState.api){
      throw new Error(`${TODO_REDUCER_NAME} needs an api`);
    }
    if(todoState.creating){
      throw new Error(`${TODO_REDUCER_NAME} is currently creating`);
    }
    dispatch({
      type: TODO_ACTIONS.INIT_CREATE,
    })
    return todoState.api.c_createItem({
      created: todo.created || Date.now(),
      finished: 0,
      description:  todo.description || "",
    }).then(()=>{
      dispatch({
        type: TODO_ACTIONS.FINISH_CREATE,
      })
    }, (error: any)=>{
      console.error(error);
      dispatch({
        type: TODO_ACTIONS.FINISH_CREATE,
      })
    })
  };
}

export function u_todoFinish(id: string){
  return (dispatch: Dispatch, getState: GetState) => {
    const todoState = getState()[TODO_REDUCER_NAME];
    initUpdate(id, dispatch, todoState)
    return todoState.api.u_finishItem(id).then(()=>{
      dispatch({
        type: TODO_ACTIONS.FINISH_UPDATE,
        id: id
      })
    }, (error: any)=>{
      console.error(error);
      dispatch({
        type: TODO_ACTIONS.FINISH_UPDATE,
        id: id
      })
    })
  }
}

export function d_todoDelete(id: string){
  return (dispatch: Dispatch, getState: GetState)=> {
    const todoState = getState()[TODO_REDUCER_NAME];
    initUpdate(id, dispatch, todoState)
    return todoState.api.d_deleteItem(id).then(()=>{
      dispatch({
        type: TODO_ACTIONS.FINISH_UPDATE,
        id: id
      })
    }, (error: any)=>{
      console.error(error);
      dispatch({
        type: TODO_ACTIONS.FINISH_UPDATE,
        id: id
      })
    })
  }
}

function initUpdate(id: string, dispatch: Dispatch, todoState: TodoState){
  if(!todoState.api){
    throw new Error(`${TODO_REDUCER_NAME} needs an api`);
  }
  if(todoState.updating.some((value)=>{
    return id === value
  })){
    throw new Error(`${TODO_REDUCER_NAME} ${id} is currently updating`);
  }
  dispatch({
    type: TODO_ACTIONS.INIT_UPDATE,
    id: id
  })
}
