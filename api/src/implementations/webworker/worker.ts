
import {
  ITodoAPI,
  Todo,
  TodoInit
} from "../../types/todo";

type postMessageFn = (str: string)=>any;

export function run(){

  var i = 0;
  function uniqueID(){
    return (
      Date.now().toString(32)
      + (i++).toString(32)
      + Math.random().toString(32).substring(2)
    );
  }

  type Listener = (value?: any)=>any;


  class JSONObjectTodoApi implements ITodoAPI {
    private values: { [key:string]: Todo } = {};
    private listeners: Array<Listener> = [];

    on(listener: ()=>any){
      this.listeners.push(listener);
      return ()=>{
        this.listeners.filter((l)=>{
          return l != listener
        })
      }
    }

    emit(value?: any){
      this.listeners.forEach((l)=>{
        l(value)
      })
    }

    public r_List(): Promise<Array<string>> {
      return Promise.resolve(Object.keys(this.values));
    }
    public r_Single(id: string): Promise<any> {
      return Promise.resolve(this.values[id]);
    }
    public r_All(): Promise<Array<Todo>> {
      return Promise.resolve(Object.values(this.values));
    }


    public c_createItem(itemInit: TodoInit): Promise<Todo>{
      const id = uniqueID();
      const item = JSON.parse(JSON.stringify(itemInit));
      item._id = id;
      this.values[id] = item;
      this.emit("update");
      return Promise.resolve(this.values[id]);
    }
    public u_finishItem(id: string): Promise<Todo> {
      if(!(id in this.values)){
        return Promise.reject("Non existant")
      }
      var value = this.values[id];
      if(value.finished){
        return Promise.reject(new Error("already finished"));
      }
      value.finished = Date.now();
      this.values[id] = value;
      this.emit("update");
      return Promise.resolve(value);
    }
    public d_deleteItem(id: string): Promise<Todo>{
      if(!(id in this.values)){
        return Promise.reject("Non existant")
      }
      const value = this.values[id];
      delete this.values[id];
      this.emit("update");
      return Promise.resolve(value);
    }
  };

  const api = new JSONObjectTodoApi();

  api.on(()=>{
    (self.postMessage as postMessageFn)(JSON.stringify({
      type: "event",
      path: "update"
    }))
  })

  function handlePromise(initData: any, p: Promise<any>){
    p.then((value)=>{
      (self.postMessage as postMessageFn)(JSON.stringify({
        type: "request",
        status: "result",
        id: initData.id,
        value: value
      }))
    }, (err)=>{
      (self.postMessage as postMessageFn)(JSON.stringify({
        type: "request",
        status: "error",
        id: initData.id,
        value: err.toString()
      }))
    })
  }

  self.onmessage = (e: any)=>{
    const data = JSON.parse(e.data);
    if(data.type === "request"){
      if(data.status === "init"){
        switch(data.path){
          case "list":
            return handlePromise(data, api.r_List.apply(api, data.args));
          case "single":
            return handlePromise(data, api.r_Single.apply(api, data.args));
          case "all":
            return handlePromise(data, api.r_All.apply(api, data.args));
          case "create":
            return handlePromise(data, api.c_createItem.apply(api, data.args));
          case "finish":
            return handlePromise(data, api.u_finishItem.apply(api, data.args));
          case "delete":
            return handlePromise(data, api.d_deleteItem.apply(api, data.args));
          default:
            self.postMessage(JSON.stringify({
              type: "request",
              status: "error",
              id: data.id,
              value: "route not found"
            }), "*")
        }
      }
    }
  }

}
