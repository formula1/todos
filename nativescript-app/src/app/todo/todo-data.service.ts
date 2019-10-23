import { Injectable } from '@angular/core';
import {
  ITodoAPI,
} from "todo-apis"

import { Todo } from "./todo"

import { CouchbaseTodoAPI } from "./todo-api-couchbase";

@Injectable()
export class TodoDataService {

  api: ITodoAPI;

  constructor() {
    this.api = new CouchbaseTodoAPI("NS_TODO_DATABASE");
    // console.log("deleting");
    // (this.api as CouchbaseTodoAPI).d_deleteAll();
    // this.api.listen(()=>{
    //   console.log("after event");
    //   this.loadTodos()
    // })
  }

  listen(l){
    this.api.listen(l)
  }

  loadTodos(){
    return this.api.r_All().then((values)=>{
      return values
    })
  }

  addTodo(todo: Todo): TodoDataService {
    this.api.c_createItem(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: string): TodoDataService {
    this.api.d_deleteItem(id);
    return this;
  }

  finishTodo(id: string){
    this.api.u_finishItem(id);
    return this;
  }

  clearDB(){

  }

  // getAllTodos(): Todo[] {
  //   return this.todos;
  // }
  //
  // // Simulate GET /todos/:id
  // getTodoById(id: string): Todo {
  //   // Simulate GET /todos
  //   return this.todos
  //     .filter(todo => todo._id === id)
  //     .pop();
  // }

}
