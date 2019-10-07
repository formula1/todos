import { Server } from "http";
import { fetch, handleResponse } from "./util/fetch";
import { todoRouter } from "./todo/router"
import { MongoTodoAPI } from "./todo/api/mongodb"
import { createBodyParser } from "./util/router";
import express from "express";

import {
  MONGO_DB_URL,
  TODO_DATABASE_NAME,
  TODO_COLLECTION_NAME,
} from "./constants/mongodb";

import {
  LIVE_SERVER_URL
} from "./constants/live_server";

const app = express();


const SERVER_PORT = process.env.INTERNAL_START_PORT;

const todoAPI = new MongoTodoAPI({
  url: MONGO_DB_URL,
  dbName: TODO_DATABASE_NAME,
  collectionName: TODO_COLLECTION_NAME
})

todoAPI.on("update", ()=>{
  fetch(LIVE_SERVER_URL).then(handleResponse).catch((error)=>{
    console.error("LIVE UPDATE ERROR:", error)
  })
})
const bodyParser = createBodyParser(
  MONGO_DB_URL, "grid_fs_files"
);

app.use(function(req, res, next) {
  console.log(process.env.EXTERNAL_SHARED_HOSTNAME);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Origin", process.env.EXTERNAL_SHARED_HOSTNAME); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const router = todoRouter(todoAPI, bodyParser)
app.use("/todo", router);
const server = new Server();

server.on("request", (req, res)=>{
  console.log("recieving request");
  app(req, res);
});

server.on('clientError', (err, socket) => {
  console.error(err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(SERVER_PORT);
