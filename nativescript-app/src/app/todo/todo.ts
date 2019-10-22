import {
  Todo as ITodo
} from "todo-apis"

import {
  uniqueID
} from "../util/db-tools"

class Todo implements ITodo {
  _id: string;
  created: number;
  finished: number;
  description: string;
  constructor(values: {description?: string}){
    this.description = "";
    Object.assign(this, values)
    this._id = uniqueID();
    this.created = Date.now();
    this.finished = 0;
  }
}

export {
  Todo
}
