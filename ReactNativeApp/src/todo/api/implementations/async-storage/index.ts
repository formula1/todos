
import AsyncStorage from '@react-native-community/async-storage';

import {
  ITodoAPI,
  Todo,
  TodoInit,
  Listener
} from "../../../types";

import {
  Queue, IndexedQueue
} from "../../../../util/promise";

import {
  uniqueID,
} from "../../../../util/db-tools"

export class AsyncStorageTodoAPI implements ITodoAPI  {
  private indexQueue: Queue = new Queue();
  private itemQueues: IndexedQueue = new IndexedQueue();

  private initKey: string;
  private listeners: Array<Listener> = [];

  listen(listener: (value:any)=>any){
    this.listeners.push(listener);
    return ()=>{
      this.listeners.filter((l)=>{
        return l != listener
      })
    }
  }

  emit(value?: any){
    this.listeners.forEach((l)=>{
      l(value)
    })
  }

  constructor(initKey: string){
    this.initKey = initKey;
    // AsyncStorage.clear()
    this.listen(()=>{
      console.log("updating");
    })
  }

  public r_All(): Promise<Array<Todo>> {
    return this.r_List().then((ids)=>{
      // return [];
      return Promise.all(ids.map((id)=>{
        return this.r_Single(id)
      }))
    })
  }

  public r_List(): Promise<Array<string>> {
    return this.indexQueue.run(()=>{
      return AsyncStorage.getItem(this.initKey +"-ids").then((idsStr)=>{
        console.log("idsStr is null " + idsStr)
        // return []
        if(idsStr === null){
          return [];
        }
        return JSON.parse(idsStr);
      });
    })
  }


  public r_Single(id: string): Promise<any> {
    return this.itemQueues.run(id, ()=>{
      return AsyncStorage.getItem(this.initKey +"-value-"+id)
    }).then((jsonStr)=>{
      if(jsonStr === null){
        throw new Error("non-existant value with id: "  + id);
      }
      return JSON.parse(jsonStr);
    })
  }

  public c_createItem(itemInit: TodoInit): Promise<Todo>{
    return this.indexQueue.run(()=>{
      const id = uniqueID();
      const item: Todo = {
        _id: id,
        finished: 0,
        created: Date.now(),
        description: itemInit.description
      };
      return AsyncStorage.getItem(this.initKey +"-ids").then((idsStr)=>{
        const ids = idsStr ? JSON.parse(idsStr) : [];
        const newIds = ids.concat([id]);
        return Promise.all([
          AsyncStorage.setItem(this.initKey +"-ids", JSON.stringify(newIds)),
          AsyncStorage.setItem(this.initKey +"-value-"+id, JSON.stringify(item))
        ])
      }).then(()=>{
        return item
      });
    }).then((value)=>{
      this.emit("update")
      return value;
    })
  }

  public u_finishItem(id: string): Promise<Todo> {
    return this.itemQueues.run(id, ()=>{
      AsyncStorage.getItem(this.initKey +"-value-"+id).then((jsonStr)=>{
        if(jsonStr === null){
          throw new Error("non-existant value with id: "  + id);
        }
        const item: Todo = JSON.parse(jsonStr);
        item.finished = Date.now()
        return AsyncStorage.setItem(
          this.initKey +"-value-"+id,
          JSON.stringify(item)
        ).then(()=>{
          return item;
        })
      })
    }).then((value)=>{
      this.emit("update")
      return value;
    })
  }
  public d_deleteItem(id: string): Promise<Todo>{
    return this.indexQueue.run(()=>{
      return this.itemQueues.run(id, ()=>{
        return Promise.all([
          AsyncStorage.getItem(this.initKey +"-ids"),
          AsyncStorage.getItem(this.initKey +"-value-"+id),
        ]).then(([oldIds, curItem])=>{
          return Promise.all([
            Promise.resolve().then(()=>{
              const ids = oldIds ? JSON.parse(oldIds) : [];
              console.log(ids);
              const newIds = ids.filter((oId: string)=>{
                return oId !== id
              });
              return AsyncStorage.setItem(this.initKey +"-ids", JSON.stringify(newIds));
            }),
            Promise.resolve().then(()=>{
              if(curItem === null){
                throw new Error("non-existant value with id: "  + id);
              }
              return AsyncStorage.removeItem(this.initKey +"-value-"+id)
            })
          ]).then(()=>{
            return JSON.parse(curItem)
          })
        })
      });
    }).then((value)=>{
      this.emit("update")
      return value;
    });
  }
};
