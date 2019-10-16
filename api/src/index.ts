import {
  EthTodoAPI
} from "./implementations/ethereum/api";

import {
  FecthTodoAPI
} from "./implementations/fetch/api";

import {
  IndexedDBTodoAPI
} from "./implementations/indexeddb/api";

import {
  WebWorkerTodoAPI
} from "./implementations/webworker/api"

import {
  ITodoAPI,
  Todo,
  TodoInit
} from "./types/todo";

export {
  ITodoAPI,
  Todo,
  TodoInit,

  EthTodoAPI,
  FecthTodoAPI,
  IndexedDBTodoAPI,
  WebWorkerTodoAPI
}
