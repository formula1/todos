import * as React from "react"

import { setupStorage } from "./storage";

import { AsyncStorageTodoAPI } from "../todo/api/implementations/async-storage";

import {
  InitView
} from "./view";

console.log("before load")

function InitRun(){
  const todoApi = new AsyncStorageTodoAPI("ASYNC-TODO-KEY");
  const store = setupStorage(todoApi);
  return <InitView store={store} />

}

export {InitRun};

// const api = new EthTodoAPI(
//   ethDBArgs
// );

// const api = new TodoAPI({
//   ...getDbArgs,
//   ...liveDBArgs
// });

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
