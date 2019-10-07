
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

class IUserAPI
  sessionToUser = {}
  r_processSessionKey(session: key): Promise<User>{

  };
  c_registerUser(): Promise<User> {

  }
  d_deleteUser(): Promise<any> {

  }
  c_createUserSession(): Promise<any> {

  }
  d_deleteUserSession(): Promise<any> {

  }
  r_getUser(): Promise<User> {

  }
};

export {
  Session,
  UserInit,
  User,
  IUserAPI
}
