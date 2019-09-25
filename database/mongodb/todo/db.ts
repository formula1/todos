import {MongoClient} from 'mongodb';
import {promisify} from 'util';

class Mongo {
  private url;
  client: void | MongoClient;
  clientUsers: 0;
  constructor(mongoUrl){
    this.url = mongoUrl;
    this.initializeClient()
  }

  requestClient(): Promise<MongoClient>{
    this.clientUsers++;
    if(this.client){
      return Promise.resolve(this.client)
    }
    return new Promise((res, rej)=>{
      MongoClient.connect(this.url, function(err, client) {
       if (err){
         this.clientUsers--;
         return rej(err);
       }
       this.client = client
       res(client);
    });
  }
  getDB(dbName){
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
   });
  }
  closeClient(){
    if(!this.client){
      return Promise.resolve();
    }

    this.client.close(()=>{

    });
    this.client = void 0;
  }
}

function setupMongo(mongoUrl){

}


const TABLE_NAME = "TODO";

const createCollection = function(db, user, input){
  return new Promise((res, rej)=>{
    db.createCollection(TABLE_NAME, (err, res)=>{
      err ? rej(err) : res()
    });
  }).then(()=>{
    db[TABLE_NAME].createIndex({ owner: 1 })
  });
}
