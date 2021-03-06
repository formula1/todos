
export interface TodoInit {
  created: number;
  finished: number;
  description:  string;
}

export interface Todo extends TodoInit {
  _id: string
}

export type Listener = (value?: any)=>any;

export interface ITodoAPI {
  listen(l: Listener): ()=>any
  emit(value: any): any
  r_List(): Promise<Array<string>>
  r_Single(id: string): Promise<Todo>
  r_All(): Promise<Array<Todo>>
  c_createItem(item: any): Promise<Todo>
  u_finishItem(id: string): Promise<Todo>
  d_deleteItem(id: any): Promise<Todo>
};
