import * as React from "react";
import moment from "moment";
import { Todo } from "../types";
import { connect } from 'react-redux'
import {
  u_todoFinish,
  d_todoDelete
} from "../api/redux/actions";
import { TodoState, TODO_REDUCER_NAME, TodoAction } from "../api/redux/constants";
import {
  View,
  Text,
  Button
} from 'react-native';


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
    <View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flexGrow: 1}}>
          <Text>{moment(item.created).toString()}</Text>
          {
            item.finished ?
              <Text>{moment(item.finished).toString()}</Text>
            :
              <Button
                title="finish"
                onPress={()=> { props.onFinish(item._id); }}
              />
          }
        </View>
        <Button
          title="X"
          onPress={ ()=>{props.onDelete(item._id);}}
        />
      </View>
      <Text>{item.description}</Text>
    </View>
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
