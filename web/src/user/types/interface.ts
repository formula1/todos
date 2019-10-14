import {
  UserFormRegister,
  UserFormLogin
} from "./UserForm";

interface UserApi {
  registerUser(form: UserFormRegister): Promise<any>;
  loginUser(form: UserFormLogin): Promise<any>;
  logoutUser(): Promise<any>;
  deleteUser(): Promise<any>
}


export {
  UserApi
};
