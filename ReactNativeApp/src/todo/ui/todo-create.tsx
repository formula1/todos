import * as React from "react";
import { connect } from 'react-redux'
import { TodoInit } from "../types";
import { JSONcopy } from "../../util/JSON";
import { c_todoCreate } from "../api/redux/actions"
import {
  View,
  Text,
  Button,
  TextInput
} from 'react-native';


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
      <View>
        <TextInput
          value={state.value}
          onChangeText={
            (text)=>{
              console.log(text)
              this.setState({ value: text });
            }
          }
        />
        <Button
          onPress={()=>{
            onCreate({
              description: state.value,
              created: Date.now(),
              finished: 0,
            });
            this.setState(JSONcopy(DEFAULT_STATE))
          }}
          title="Create"
        />
      </View>
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
