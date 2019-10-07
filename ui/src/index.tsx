import * as React from "react"
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { combineReducers } from 'redux'
import { makeStore } from "./util/redux";

import { TodoPage } from "./todo/ui-promise/todo";
import { TODO_REDUCER_NAME } from "./todo/api/redux-promise/constants";
import todoReducer from "./todo/api/redux-promise/reducer";
import { api_setAPI, r_listTodos } from "./todo/api/redux-promise/actions";

import {
  SERVER_HOST,
  PUBLIC_UI_PORT,
  PUBLIC_SERVER_PORT
} from "./constants/development";

import { TodoAPI } from "./todo/api/fetch/api";
import { getDbArgs, liveDBArgs } from "./constants/development";

const store = makeStore(combineReducers({
  [TODO_REDUCER_NAME]: todoReducer
}));

const api = new TodoAPI({
  ...getDbArgs,
  ...liveDBArgs
});

function updateTodos(){
  api.r_All().then((items)=>{
    console.log("dispatching update", items)
    store.dispatch(r_listTodos(items))
  }).catch((error)=>{
    console.error(error);
  })
}

api.on("update", ()=>{
  console.log("retrieving_all")
  updateTodos()
})

store.dispatch(api_setAPI(api))
updateTodos()

ReactDOM.render(
  <Provider store={store}>
    <TodoPage />
  </Provider>,
  document.querySelector("#init")
);
//
// const { StackLayout } = require("./reusable/layouts");
//
// const Auth = require("./Themes/Auth");
// const { Header, NameMe } = require("./Themes/Header");
// const { BrowserRouter } = require("react-router-dom");
//
// const { initializeFirebase } = require("./helpers/firebase");
// const Registration = require("./screens/Registration");
//
// initializeFirebase().then(()=>{
//   ReactDOM.render(
//
//     // React.createElement(Header, {}),
//     <Auth>
//       <Registration>
//         <BrowserRouter >
//           <StackLayout>
//               <Header />
//               <NameMe />
//           </StackLayout>
//         </BrowserRouter>
//       </Registration>
//     </Auth>,
//     document.querySelector("#root")
//   );
//
// });
