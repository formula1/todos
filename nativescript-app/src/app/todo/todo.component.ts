import { Component, ChangeDetectorRef } from '@angular/core';

import {TodoDataService} from './todo-data.service';
import { Todo } from "./todo";
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './todo.component.html',
  // styleUrls: ['./todo.component.css'],
  providers: [TodoDataService]
})
export class TodoComponent {
  title = 'app works!';
  description: string = ""
  todos: Todo[] = [];
  constructor(
    private todoDataService: TodoDataService,
    private cdr: ChangeDetectorRef
  ) {
    todoDataService.listen(()=>{
      console.log("listener")
      this.todoDataService.loadTodos().then((todos)=>{
        console.log("setting todos");
        this.todos = todos
        console.log(this.todos);
        this.cdr.detectChanges();
      })
    });
  }

  ngOnInit() {
    this.todoDataService.loadTodos().then((todos)=>{
      console.log("ngInit")
      this.todos = todos
    })
  }

  public moment(){

  }

  public trackItem (index: number, item: Todo) {
    return item._id;
  }

  addTodo() {
    console.log("ADD TODO")
    console.log("description: "+this.description);
    const todo = new Todo({description: this.description});
    this.todoDataService.addTodo(todo);
    this.description = ""
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo._id);
  }

 // Service is now available as this.todoDataService
  toggleTodoComplete(todo: Todo) {
    console.log("toggling complete");
    this.todoDataService.finishTodo(todo._id);
  }

  // get todos() {
  //   return this.todoDataService.getAllTodos();
  // }
}
