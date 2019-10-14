
interface UserFormState {
  username: string,
  password: string,
  register: boolean,
  password2: string,
}


interface UserFormRegister {
  username: string,
  password: string,
  password2: string,
}

interface UserFormLogin {
  username: string,
  password: string,
}

export {
  UserFormState,
  UserFormRegister,
  UserFormLogin
}
