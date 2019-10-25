import { combineReducers } from 'redux'
import { Store, makeStore } from "../util/redux";

import { TODO_REDUCER_NAME } from "../todo/api/redux/constants";
import todoReducer from "../todo/api/redux/reducer";
import { api_setAPI, r_listTodos } from "../todo/api/redux/actions";

import { ITodoAPI } from "../todo/types";

export function setupStorage(api: ITodoAPI): Store{

    const store = makeStore(combineReducers({
      [TODO_REDUCER_NAME]: todoReducer,
    }));

    function updateTodos(){
      api.r_All().then((items)=>{
        console.log("dispatching update", items)
        store.dispatch(r_listTodos(items))
      }).catch((error)=>{
        console.error("requesting all/", error);
      })
    }

    api.listen(()=>{
      console.log("retrieving_all")
      updateTodos()
    })

    store.dispatch(api_setAPI(api))
    updateTodos()

    return store;

}
