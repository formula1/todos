import { Injectable } from '@angular/core';
import {
  ITodoAPI,
} from "todo-apis"

import { Todo } from "./todo"

import { CouchbaseTodoAPI } from "./todo-api-couchbase";

@Injectable()
export class TodoDataService {

  todos: Todo[] = [];

  api: ITodoAPI;

  constructor() {
    this.api = new CouchbaseTodoAPI("NS_TODO_DATABASE");
    this.api.listen(()=>{
      this.api.r_All().then((values)=>{
        this.todos = values
      })
    })
  }

  addTodo(todo: Todo): TodoDataService {
    todo.created = Date.now();
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
  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: string): Todo {
    return this.todos
      .filter(todo => todo._id === id)
      .pop();
  }

}
