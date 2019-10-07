import Web3 from "web3";

import {EventEmitter} from "events";

import {
  ITodoAPI,
  Todo,
  TodoInit
} from "../../types/interface";

import {
  getDatabase,
  getDatabaseArgs,
} from "../../../util/ethereum";

import {
  Promise,
} from "../../../util/promise"

import {
  uniqueID,
} from "../../../util/db-tools"

import {
  TODO_OBJECT_STORE_NAME,
} from "./constants";

export class LocalTodoAPI extends EventEmitter implements ITodoAPI {
  private args: getDatabaseArgs
  private web3: Web3;
  constructor(args: getDatabaseArgs){
    super()
    this.web3 = new Web3()
    this.on("update", ()=>{
      console.log("updating");
    })
    this.args = args;
  }

  private getDB(){
    var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

    return getDatabase(this.args);
  }

  public r_List(): Promise<any /*Array<Todo> */> {
    return this.getDB().then((db)=>{
      return new Promise((res, rej)=>{
        var transaction = db.transaction([TODO_OBJECT_STORE_NAME], "readwrite");
        var objectStore = transaction.objectStore(TODO_OBJECT_STORE_NAME);
        var request = objectStore.getAllKeys();
        request.onerror = rej;
        request.onsuccess = (ev)=>{
          console.log(ev)
          res((ev.target as any).result);
        };
      });
    });
  }
  public r_Single(id: string): Promise<any> {
    return this.getDB().then((db)=>{
      return new Promise((res, rej)=>{
        var transaction = db.transaction([TODO_OBJECT_STORE_NAME], "readwrite");
        var objectStore = transaction.objectStore(TODO_OBJECT_STORE_NAME);
        var request = objectStore.get(id);
        request.onerror = rej;
        request.onsuccess = (ev)=>{
          console.log(ev)
          res((ev.target as any).result);
        };
      });
    });
  }
  public r_All(): Promise<any /*Array<Todo> */> {
    return this.getDB().then((db)=>{
      return new Promise((res, rej)=>{
        var transaction = db.transaction([TODO_OBJECT_STORE_NAME], "readwrite");
        var objectStore = transaction.objectStore(TODO_OBJECT_STORE_NAME);
        var request = objectStore.getAll();
        request.onerror = rej;
        request.onsuccess = (ev)=>{
          console.log(ev)
          res((ev.target as any).result);
        };
      });
    });
  }


  public c_createItem(item: TodoInit): Promise<Todo>{
    return this.getDB().then((db)=>{
      return new Promise((res, rej)=>{
        (item as Todo)._id = uniqueID();
        var transaction = db.transaction([TODO_OBJECT_STORE_NAME], "readwrite");
        var objectStore = transaction.objectStore(TODO_OBJECT_STORE_NAME);
        var request = objectStore.add(item);
        request.onerror = rej;
        request.onsuccess = ()=>{
          res(item as Todo);
        };
      });
    }).then((v: Todo)=>{
      this.emit('update');
      return v
    });
  }
  public u_finishItem(id: string): Promise<Todo> {
    return this.getDB().then((db)=>{
      return new Promise((res, rej)=>{
        var transaction = db.transaction([TODO_OBJECT_STORE_NAME], "readwrite");
        var objectStore = transaction.objectStore(TODO_OBJECT_STORE_NAME);
        var request = objectStore.get(id);
        request.onerror = rej;
        request.onsuccess = (event)=>{
          res([objectStore, event]);
        };
      });
    }).then(([objectStore, event])=>{
      return new Promise((res, rej)=>{
        var data = event.target.result;
        data.finished = Date.now();
        var requestUpdate = objectStore.put(data);
         requestUpdate.onerror = rej;
         requestUpdate.onsuccess = ()=>{
           res(data)
         };
      });
    }).then((v: Todo)=>{
      this.emit('update');
      return v
    });
  }
  public d_deleteItem(id: string): Promise<Todo>{
    return this.getDB().then((db)=>{
      return new Promise((res, rej)=>{
        var objectStore = db.transaction([TODO_OBJECT_STORE_NAME], "readwrite")
        .objectStore(TODO_OBJECT_STORE_NAME);
        var request = objectStore.get(id);
        request.onerror = rej;
        request.onsuccess = (event)=>{
          res([objectStore, event]);
        };
      });
    }).then(([objectStore, event])=>{
      return new Promise((res, rej)=>{
        var data = event.target.result;
        var requestUpdate = objectStore.delete(id);
         requestUpdate.onerror = rej;
         requestUpdate.onsuccess = ()=>{
           res(data)
         };
      });
    }).then((v: Todo)=>{
      this.emit('update');
      return v
    });
  }
};
