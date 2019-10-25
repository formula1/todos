import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Store, createStore, applyMiddleware } from 'redux'

function makeStore(reducer: (state: any, action: any)=> any){
  const loggerMiddleware = createLogger()

  const store = createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  );
  return store
}

export {
  makeStore,
  Store
};
