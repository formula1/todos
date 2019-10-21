
import {EventEmitter} from "events";

import {
  ITodoAPI,
  Todo,
  TodoInit,
  Listener
} from "../../types/todo";

import {
  fetch,
  jsonToFormData,
  handleResponse
} from "../../util/fetch";

import {
  FetchDBArgs,
  LiveDBArgs
} from "./constants";

export class FecthTodoAPI implements ITodoAPI  {
  private args: FetchDBArgs
  private liveConnection: WebSocket;

  private listeners: Array<Listener> = [];

  listen(listener: (value:any)=>any){
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

  constructor(args: FetchDBArgs & LiveDBArgs){
    this.liveConnection = new WebSocket(args.liveUrl)
    this.liveConnection.onmessage = ()=>{
      this.emit("update");
    }
    this.listen(()=>{
      console.log("updating");
    })
    console.log(args)
    this.args = args;
  }

  public r_All(): Promise<any /*Array<Todo> */> {
    return fetch(
      `${this.args.url}/todo/request`
    ).then(handleResponse)
  }

  public r_List(): Promise<any /*Array<Todo> */> {
    return fetch(
      `${this.args.url}/todo/request/keys`
    ).then(handleResponse)
  }


  public r_Single(id: string): Promise<any> {
    return fetch(
      `${this.args.url}/todo/request/${id}`
    ).then(handleResponse)
  }

  public c_createItem(item: TodoInit): Promise<Todo>{
    console.log("creating", item, `${this.args.url}/todo/create`);

    return fetch(
      `${this.args.url}/todo/create`,
      {
        method: "post",
        body: jsonToFormData(item)
      }
    ).then(handleResponse)
  }

  public u_finishItem(id: string): Promise<Todo> {
    return fetch(
      `${this.args.url}/todo/finish/${id}`
    ).then(handleResponse)
  }
  public d_deleteItem(id: string): Promise<Todo>{
    return fetch(
      `${this.args.url}/todo/delete/${id}`
    ).then(handleResponse)
  }
};
