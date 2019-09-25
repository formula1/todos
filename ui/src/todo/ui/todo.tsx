import * as React from "react";
import TodoList from "./todo-list";
import TodoCreate from "./todo-create";

export default function Todo(){
  return (
    <div>
      <TodoList />
      <TodoCreate />
    </div>
  );
}
