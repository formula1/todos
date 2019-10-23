import {
  ITodoAPI,
  TodoInit,
  Todo,
  Listener
} from "todo-apis"

import {
  uniqueID
} from "../util/db-tools"
import { Couchbase } from 'nativescript-couchbase-plugin';

export class CouchbaseTodoAPI implements ITodoAPI {
  database: Couchbase
  listeners: Listener[] = [];
  constructor(databaseName: string){
    this.database = new Couchbase(databaseName);
    this.database.addDatabaseChangeListener((changes)=>{
      console.log("database change listener");
      console.log(changes);
      this.emit("update");
    });
  }

  listen(l: Listener){
    this.listeners.push(l);
    return ()=>{
      this.listeners = this.listeners.filter((curL)=>{curL!==l})
    };
  }

  emit(value){
    console.log("emitting");
    this.listeners.forEach((l)=>{
      l(value);
    })
  }

  r_All(){
    return Promise.resolve().then(()=>{
      return this.database.query({
        select: [], // Leave empty to query for all
      });
    });
  }
  r_List(){
    return this.r_All().then((values)=>{
      return values.map((v)=>{
        return v._id
      })
    })
  }
  r_Single(id: string){
    return Promise.resolve().then(()=>{
      return this.database.getDocument(id);
    });
  }
  c_createItem(values: TodoInit){
    console.log(values);
    return Promise.resolve().then(()=>{
      const value: Todo = Object.assign({}, values, {
        created: Date.now(),
        finished: 0,
        _id: uniqueID()
      })
      return this.database.createDocument(value, value._id);
    }).then((id)=>{
      return this.r_Single(id);
    })
  }
  u_finishItem(id){
    return Promise.resolve().then(()=>{
      return this.database.updateDocument(id, { finished: Date.now() })
    }).then(()=>{
      return this.r_Single(id);
    })
  }
  d_deleteItem(id){
    return this.r_Single(id).then((doc)=>{
      return Promise.resolve().then(()=>{
        return this.database.deleteDocument(id)
      }).then(()=>{
        return doc;
      })
    })
  }
  d_deleteAll(){
    this.r_List().then((ids)=>{
      this.database.inBatch(() => {
        ids.forEach((id)=>{
          this.database.deleteDocument(id);
        })
      });
    })
  }
}
