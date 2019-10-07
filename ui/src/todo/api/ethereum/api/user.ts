import {
  UserInit,
  User,
  IUserAPI
} from "../../../types/user";

import Web3 from "web3";

class User implements IUserAPI {
  private currentUser: User | void
  private web3: Web3
  constructor(web3: Web3){
    this.web3 = web3;
  }
  r_findUsers(){

  }
  c_createUser(){

  }
  rc_findOrCreateUser(){

  }
  getUser(){

  }
}
