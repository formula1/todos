import { MongoClient, Db } from 'mongodb';
import { Promise } from "./promise";
import { EventEmitter } from "events"

export class ClientWaiter extends EventEmitter {
  private url: string;
  private client: MongoClient  | void;
  private clientError: Error  | void;
  private clientTry: boolean = false;
  constructor(url: string){
    super();
    console.log("MONGO WAITER CONSTRUCTOR:", url);

    this.url = url;
  }
  public createOrWaitForClient(): Promise<MongoClient>{
    if(this.clientTry){
      return new Promise((res, rej)=>{
        if(this.clientError) return rej(this.clientError)
        if(this.client) return res(this.client);
        return this.addListener("clientStatus", ()=>{
          if(this.clientError) return rej(this.clientError)
          if(this.client) return res(this.client);
        });
      });
    }
    this.clientTry = true;
    return createClient(this.url).then((client)=>{
      this.client = client;
      this.emit("clientStatus");
      return client;
    }, (error)=>{
      this.clientError = error;
      this.emit("clientStatus");
      throw error;
    })
  }
}

export function createClient(url: string): Promise<MongoClient>{
  return new Promise((res, rej)=>{
    MongoClient.connect(url, function(err, client) {
      if(err) return rej(err);
      console.log("Connected successfully to server");
      res(client);
    });
  })
}

export function getDatabaseFromClient(client: MongoClient, dbName: string): Db{
  return client.db(dbName);
}


export type MongoDBArgs = {
  url: string,
  dbName: string
  collectionName: string
}
export type MongoDBReturn = { client: MongoClient, db: Db }
export function getDatabase(
  args: MongoDBArgs
): Promise<MongoDBReturn>{
  return createClient(args.url).then((client)=>{
    const db = getDatabaseFromClient(client, args.dbName)
    return { client, db }
  })
}
