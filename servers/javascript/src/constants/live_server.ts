import {
  TODO_DATABASE_NAME,
  TODO_COLLECTION_NAME,
} from "./mongodb";

const hostName = process.env.PRIVATE_LIVE_SERVER_HOSTNAME;
const port = process.env.PUBLIC_LIVE_PORT

const LIVE_SERVER_URL = `http://${hostName}:${8080}/mongodb/${TODO_DATABASE_NAME}/${TODO_COLLECTION_NAME}`;

export {
  LIVE_SERVER_URL
}
