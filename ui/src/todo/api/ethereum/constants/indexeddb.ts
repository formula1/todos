
import {
  UpgradeFns
} from "../../../../util/indexeddb";

const DB_NAME = "USER";
const DB_VERSION = 1;
const USER_OBJECT_STORE_NAME = "WEB3"

const dbUpgrades: UpgradeFns = {
  0: (db: IDBDatabase)=>{
    db.createObjectStore(USER_OBJECT_STORE_NAME, { keyPath: "_id" });
  }
};
import {
  IndexedDBArgs,
} from "../../../../util/indexeddb";

const getDbArgs: IndexedDBArgs = {
  name: DB_NAME,
  version: DB_VERSION,
  upgradeFns: dbUpgrades
};


export {
  DB_NAME,
  DB_VERSION,
  dbUpgrades,
  USER_OBJECT_STORE_NAME,
  getDbArgs
};
