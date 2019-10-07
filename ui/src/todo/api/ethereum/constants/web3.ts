
const DB_URL = "localhost:8545";
const TODO_PATH = "todo"
const USER_PATH = "user"

type FetchDBArgs = {
  url: string,
  todo_path: string,
  user_path: string
}

const fetchDBArgs = {
  url: DB_URL,
  todo_path: TODO_PATH,
  user_path: USER_PATH
}

export {
  DB_URL,
  TODO_PATH,
  FetchDBArgs,
  fetchDBArgs
};
