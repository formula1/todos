import UserAPI from "./user-api";
import * as React from "react";
import UserForm from "./user-form";

const DEFAULT_STATE = {
  user: null
}

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = { ...DEFAULT_STATE };
    UserAPI.getObservable().subscribe((value)=>{
      this.setState({
        user: value
      })
    })
  }
  render(){
    return (
      !this.state.user ? (
        <UserForm />
      ) : (
        this.props.children
      )
    )
  }
}

export default User;
