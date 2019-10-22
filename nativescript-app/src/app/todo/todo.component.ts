import { Component } from '@angular/core';

import {TodoDataService} from './todo-data.service';
import { Todo } from "./todo";

@Component({
  selector: 'app-root',
  templateUrl: './todo.component.html',
  // styleUrls: ['./todo.component.css'],
  providers: [TodoDataService]
})
export class TodoComponent {
  title = 'app works!';
  newTodo: Todo = new Todo({});
  constructor(private todoDataService: TodoDataService) { }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo({});
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo._id);
  }

 // Service is now available as this.todoDataService
  toggleTodoComplete(todo: Todo) {
    this.todoDataService.finishTodo(todo._id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
