
type Session = {
  user: string,
  expiration: number
};

interface UserInit {
  purpose: string,
}

interface User extends UserInit {
  _id: string,
}

interface IUserAPI {
  c_registerUser(): Promise<any>
  d_deleteUser(): Promise<any>
  c_createUserSession(): Promise<any>
  d_deleteUserSession(): Promise<any>
  r_getUser(): Promise<User>
  r_getUserSession(): Promise<Session>
};

export {
  Session,
  UserInit,
  User,
  IUserAPI
}
