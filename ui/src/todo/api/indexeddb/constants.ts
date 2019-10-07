
import {
  UpgradeFns
} from "../../../util/indexeddb";

const DB_NAME = "TodoLocal";
const DB_VERSION = 1;
const TODO_OBJECT_STORE_NAME = "TODO"

const dbUpgrades: UpgradeFns = {
  0: (db: IDBDatabase)=>{
    db.createObjectStore(TODO_OBJECT_STORE_NAME, { keyPath: "_id" });
  }
};
import {
  IndexedDBArgs,
} from "../../../util/indexeddb";

const getDbArgs: IndexedDBArgs = {
  name: DB_NAME,
  version: DB_VERSION,
  upgradeFns: dbUpgrades
};


export {
  DB_NAME,
  DB_VERSION,
  dbUpgrades,
  TODO_OBJECT_STORE_NAME,
  getDbArgs
};
