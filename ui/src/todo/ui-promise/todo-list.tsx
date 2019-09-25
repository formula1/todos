import * as React from "react";
import TodoItem from "./todo-item";
import { Todo } from "../types/interface";
import { connect } from 'react-redux'
import { TodoState, TODO_REDUCER_NAME, TodoAction } from "../api/redux-promise/constants";


type PROPS = {
  todos: Array<string>
};

function TodoListView(props: PROPS) {
  // Declare a new state variable, which we'll call "count"
  const d = Date.now();
  return (
    <div>
      {
        props.todos.map((key)=>{
          return (<TodoItem key={key + " " + d} id={key} />);
        })
      }
    </div>
  );
}

const mapStateToProps = (state: {[TODO_REDUCER_NAME]: TodoState }) => ({
  todos: Object.keys(state[TODO_REDUCER_NAME].todos)
});

const mapDispatchToProps = () => ({})

const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListView)

export default TodoList;
