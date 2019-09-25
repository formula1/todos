

import {
  Promise,
} from "../../util/promise"

export interface TodoInit {
  created: number;
  finished: number;
  description:  string;
}

export interface Todo extends TodoInit {
  _id: string
}

export interface ITodoAPI {
  r_List(): Promise<Array<string>>
  r_Single(id: string): Promise<Todo>
  r_All(): Promise<Array<Todo>>
  c_createItem(item: any): Promise<Todo>
  u_finishItem(id: string): Promise<Todo>
  d_deleteItem(id: any): Promise<Todo>
};
