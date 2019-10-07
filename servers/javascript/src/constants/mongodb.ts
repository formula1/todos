const mongoName = process.env.MONGO_INITDB_ROOT_USERNAME
const mongoPass = process.env.MONGO_INITDB_ROOT_PASSWORD
const mongoHostName = process.env.MONGO_DB_HOSTNAME;
const mongoPort = process.env.MONGO_DB_PORT

const MONGO_DB_URL = `mongodb://${mongoName}:${mongoPass}@${mongoHostName}:${mongoPort}`;

console.log(MONGO_DB_URL)


const TODO_DATABASE_NAME = "ONLY_TODO";
const TODO_COLLECTION_NAME = "TODO";


export {
  MONGO_DB_URL,
  TODO_DATABASE_NAME,
  TODO_COLLECTION_NAME
}
