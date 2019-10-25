import * as React from "react";
import TodoList from "./todo-list";
import TodoCreate from "./todo-create";
import {
  View,
} from 'react-native';


export function TodoPage(){
  return (
    <View>
      <TodoList />
      <TodoCreate />
    </View>
  );
}
