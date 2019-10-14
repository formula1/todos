import * as React from "react";
import TodoList from "./todo-list";
import TodoCreate from "./todo-create";

export function TodoPage(){
  return (
    <div>
      <TodoList />
      <TodoCreate />
    </div>
  );
}
