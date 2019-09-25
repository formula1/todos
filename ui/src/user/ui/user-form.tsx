import * as React from "react";
import UserAPI from "../api/user-api";
import { UserFormState } from "../types/UserForm";
const DEFAULT_STATE: UserFormState = {
  username: "",
  password: "",
  register: false,
  password2: "",
};



class UserForm extends React.Component {
  state: UserFormState
  constructor(props: any) {
    super(props)
    this.state = { ...DEFAULT_STATE }
  }
  render(){
    const api = UserAPI;
    return (
      <div>
        <div>
          <span>Username</span>
          <input
            type="text"
            value={this.state.username}
            onChange={
              (newValue)=>{ this.setState({ username: newValue })}
            }
          />
        </div>
        <div>
          <span>Password</span>
          <input
            type="password"
            value={this.state.password}
            onChange={
              (newValue)=>{ this.setState({ password: newValue })}
            }
          />
        </div>
        <div>
          <span>Register as New User</span>
          <input
            type="checkbox"
            checked={this.state.register}
            onChange={
              (newValue)=>{ this.setState({ register: newValue })}
            }
          />
        </div>
        {
          this.state.register && (
            <div>
              <span>Password Verify</span>
              <input
                type="password"
                value={this.state.password2}
                onChange={
                  (newValue)=>{ this.setState({ password2: newValue })}
                }
              />
            </div>
          )
        }
        {
          this.state.register ? (
            <button onClick={()=>{
              UserAPI.registerUser(this.state)
            }}>Register</button>
          ) : (
            <button onClick={()=>{
              UserAPI.loginUser(this.state)
            }}>Login</button>
          )
        }
      </div>
    );

  }
}

export default UserForm;
