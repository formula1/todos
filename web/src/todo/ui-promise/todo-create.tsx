import * as React from "react";
import { connect } from 'react-redux'
import { TodoInit } from "../types/todo";
import { JSONcopy } from "../../util/JSON";
import { c_todoCreate } from "../api/redux-promise/actions"

type PROPS = {
  onCreate: (todo: TodoInit)=>any
}

const DEFAULT_STATE = {
  value: ""
};

class TodoCreateView extends React.Component {
  state: {
    value: string
  } = JSONcopy(DEFAULT_STATE)
  render(){
    const { state } = this;
    const { onCreate } = this.props as PROPS;
    return (
      <div>
        <input
          type="text"
          value={state.value}
          onChange={
            (event)=>{ this.setState({ value: event.target.value }); }
          }
        />
        <button onClick={()=>{
          onCreate({
            description: state.value,
            created: Date.now(),
            finished: 0,
          });
        }}>Create</button>
      </div>
    );

  }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: (value: any)=> any) => (
  {
    onCreate: (value: TodoInit)=> (dispatch(c_todoCreate(value))),
  }
)

const TodoCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCreateView)

export default TodoCreate;
