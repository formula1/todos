
import {EventEmitter} from "events";

import { MongoClient, ObjectId } from "mongodb";

import {
  ITodoAPI,
  Todo,
  TodoInit
} from "../../types/todo";

import {
  ROUTER_ERROR
} from "../../../util/router";

import {
  ClientWaiter,
  getDatabaseFromClient,
  createClient,
  MongoDBArgs,
} from "../../../util/mongodb";

import {
  Promise,
} from "../../../util/promise"

export class MongoTodoAPI extends EventEmitter implements ITodoAPI {
  private args: MongoDBArgs
  private clientWaiter: ClientWaiter;
  constructor(args: MongoDBArgs){
    super()
    this.clientWaiter = new ClientWaiter(args.url);
    this.on("update", ()=>{
      console.log("updating");
    })
    this.args = args;
  }

  private getCollection(){
    return this.clientWaiter.createOrWaitForClient().then((client)=>{
      const db = getDatabaseFromClient(client, this.args.dbName)
      const collection = db.collection(this.args.collectionName);
      return {
        client, db, collection
      }
    })
  }

  public r_List(): Promise<any /*Array<Todo> */> {
    return this.getCollection().then(({
      client, db, collection
    })=>{
      return new Promise((res, rej)=>{
        collection
        .find({})
        .map( function(u) { return u._id; } )
        .toArray(function(err, docs) {
          if(err) return rej(err);
          res(docs)
        });
      })
    });
  }
  public r_Single(id: string): Promise<any> {
    return this.getCollection().then(({
      client, db, collection
    })=>{
      const oId = new ObjectId(id);
      return new Promise((res, rej)=>{
        collection.find({ _id: { $eq: oId } }).toArray(function(err, docs) {
          console.log(err, docs);
          if(err) return rej(err);
          if(docs.length === 0) return rej(new Error(ROUTER_ERROR.NOT_FOUND))
          if(docs.length > 1) return rej(new Error(ROUTER_ERROR.DUPLICATE_FOUND))
          res(docs[0])
        });
      })
    });
  }
  public r_All(): Promise<any /*Array<Todo> */> {
    return this.getCollection().then(({
      client, db, collection
    })=>{
      return new Promise((res, rej)=>{
        collection
        .find({})
        .toArray(function(err, docs) {
          if(err) return rej(err);
          res(docs)
        });
      })
    });
  }


  public c_createItem(itemInit: TodoInit): Promise<Todo>{
    return this.getCollection().then(({
      client, db, collection
    })=>{
      const item = (itemInit as Todo);
      return collection.insert(item)
    }).then((insertWriteOp)=>{
      console.log(insertWriteOp);
      this.emit('update');
      return insertWriteOp.ops[0] as any
    });
  }
  public u_finishItem(id: string): Promise<Todo> {
    const oId = new ObjectId(id);
    return this.getCollection().then(({
      client, db, collection
    })=>{
      return collection.update({ _id: oId }, { $set: { finished: Date.now() } })
    }).then((insertWriteOp)=>{
      console.log("u_finishItem:", Object.keys(insertWriteOp));
      console.log("u_finishItem:", insertWriteOp.result);
      if(insertWriteOp.result.nModified < 1){
        throw new Error(ROUTER_ERROR.NOT_FOUND)
      }
      if(insertWriteOp.result.nModified > 1){
        throw new Error(ROUTER_ERROR.DUPLICATE_FOUND)
      }
      this.emit('update');
      return this.r_Single(id)
    });
  }
  public d_deleteItem(id: string): Promise<Todo>{
    const oId = new ObjectId(id);
    return this.r_Single(id).then((single)=>{
      return this.getCollection().then(({
        client, db, collection
      })=>{
        return collection.deleteOne({ _id: oId })
      }).then((insertWriteOp)=>{
        console.log("d_deleteItem:", Object.keys(insertWriteOp));
        console.log("d_deleteItem:", insertWriteOp.result);
        if(insertWriteOp.result.n > 1){
          throw new Error(ROUTER_ERROR.DUPLICATE_FOUND)
        }
        this.emit('update');
        return single
      })
    });
  }
};
