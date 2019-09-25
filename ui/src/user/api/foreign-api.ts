import {
  fetch,
} from "../../util/fetch";

import {
  UserApi,
} from "../types/interface";

import {
  UserFormRegister,
  UserFormLogin
} from "../types/UserForm";


import {
  uniqueID
} from "../../util/db-tools";

export class ForiegnUserApi implements UserApi {
  apiUrl: string;
  constructor(apiUrl: string){
    this.apiUrl = apiUrl;
  }
  registerUser(form: UserFormRegister){
    return fetch(`https://${this.apiUrl}/user/register`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(form), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      response.json().then((json)=>{
        if(response.status !== 200) {
          throw json
        }
        return json;
      })
    });
  }
  loginUser(form: UserFormLogin){
    return fetch(`https://${this.apiUrl}/user/login`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(form), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      response.json().then((json)=>{
        if(response.status !== 200) {
          throw json
        }
        return json;
      })
    });
  }
  logoutUser(){
    return fetch(`https://${this.apiUrl}/user/logout`)
    .then((response) => {
      response.json().then((json)=>{
        if(response.status !== 200) {
          throw json
        }
        return json;
      })
    })
  }

  deleteUser(){
    return fetch(`https://www.${this.apiUrl}/user/delete`)
    .then((response) => {
      response.json().then((json)=>{
        if(response.status !== 200) {
          throw json
        }
        return json;
      })
    });
  }
}
