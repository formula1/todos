
import {
  ITodoAPI,
  Todo,
  TodoInit,
  Listener
} from "../../../types";

import { Worker } from 'react-native-workers';

import {
  uniqueID,
} from "../../../../util/db-tools"

type MessageRequest = {
  type: "request"
  status: "init"
  path: string
  id: string
  args: Array<any>
};
type MessageResponse = {
  type: "request"
  status: "result" | "error"
  id: string,
  value: any
};
type MessageEvent = {
  type: "event",
  path: string,
  value: any
};

type ResRej = [(value:any)=>any, (value:any)=>any];

export class WorkerTodoAPI implements ITodoAPI  {
  private worker:Worker;
  private idListeners: {[id: string]: ResRej} = {};

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

  constructor(){
    this.worker = new Worker("./inside.js");
    this.worker.onmessage = (message)=>{
      this.resolveResponse(JSON.parse(message));
    }
    this.listen(()=>{
      console.log("updating");
    })
  }

  private initRequest(path: string, args: Array<any>){
    const id = uniqueID();
    const message: MessageRequest = {
      type: "request",
      status: "init",
      path: path,
      id: id,
      args: args
    };
    return new Promise((res, rej)=>{
      this.idListeners[id] = [res, rej];
      this.worker.postMessage(JSON.stringify(message))
    })
  }

  private resolveResponse(mes: MessageRequest | MessageEvent | MessageResponse){
    if(mes.type === "event"){
      switch(mes.path){
        case "update": return this.emit("update");
        default:
          console.log("unexpected path", mes);
          return;
      }
    }
    if(mes.type === "request"){
      if(mes.status === "init"){
        console.error("not expecting request", mes);
        return
      }
      if(!(mes.id in this.idListeners)){
        console.error("not listening for message id", mes);
        return
      }
      const listeners = this.idListeners[mes.id];
      delete this.idListeners[mes.id];
      switch(mes.status){
        case "result":
          return listeners[0](mes.value)
        case "error":
          return listeners[1](mes.value)
        default:
          console.error("not listening for message id", mes);
          return
      }
    }
  }

  public r_All(): Promise<Array<Todo>> {
    return this.initRequest("all", []) as Promise<Array<Todo>>;
  }

  public r_List(): Promise<Array<string>> {
    return this.initRequest("list", []) as Promise<Array<string>>;
  }


  public r_Single(id: string): Promise<Todo> {
    return this.initRequest("single", [id]) as Promise<Todo>;
  }

  public c_createItem(item: TodoInit): Promise<Todo>{
    return this.initRequest("create", [item]) as Promise<Todo>;
  }

  public u_finishItem(id: string): Promise<Todo> {
    return this.initRequest("finish", [id]) as Promise<Todo>;
  }
  public d_deleteItem(id: string): Promise<Todo>{
    return this.initRequest("delete", [id]) as Promise<Todo>;
  }
};
