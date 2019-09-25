import * as React from "react";
import * as moment from "moment";
import { Todo } from "../types/interface";
import { connect } from 'react-redux'
import {
  u_todoFinish,
  d_todoDelete
} from "../api/redux-promise/actions";
import { TodoState, TODO_REDUCER_NAME, TodoAction } from "../api/redux-promise/constants";

type PROPS = {
  id: string,
  item: Todo,
  onFinish: (id: string)=>any,
  onDelete: (id: string)=>any
};

function TodoItemView (props: PROPS){
  const item = props.item;
  console.log(props, item);
  return (
    <div>
      <div className="todo-header">
        <div className="todo-dates">
          <div className="todo-date-created">{moment(item.created).toString()}</div>
          <div
            className={"todo-date-finished-" + !!item.finished}
            onClick={
              !item.finished ? ()=> { props.onFinish(item._id); } : null
            }
          >{
            item.finished ? moment(item.finished).toString() : "finish"
          }</div>
        </div>
        <div className="todo-delete" onClick={ ()=>{
          props.onDelete(item._id);
        } }>X</div>
      </div>
      <div className="todo-description" >{item.description}</div>
    </div>
  );
}

const mapStateToProps = (state: {[TODO_REDUCER_NAME]: TodoState }, props: { id: string }) => {
  console.log(props);
  return {
    item: state[TODO_REDUCER_NAME].todos[props.id]
  }
};

const mapDispatchToProps = (dispatch: (value: any)=> any) => (
  {
    onFinish: (id: string)=> (dispatch(u_todoFinish(id))),
    onDelete: (id: string)=> (dispatch(d_todoDelete(id)))
  }
)

const TodoItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemView)

export default TodoItem;
