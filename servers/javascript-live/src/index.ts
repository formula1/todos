import {Server} from 'http';
import * as url from 'url';
import { WsBroadcaster } from "./tool/ws-broadcast";

import {
  MONGO_DB_URL,
  TODO_DATABASE_NAME,
  TODO_COLLECTION_NAME,
} from "./constants/mongodb";

import {
  INTERNAL_HOSTNAME,
  EXTERNAL_HOSTNAME
} from "./constants/self";

const mLtoWB = new WsBroadcaster(
  TODO_DATABASE_NAME,
  TODO_COLLECTION_NAME,
)
const server = new Server();

server.on("request", (req, res)=>{
  const parsedUrl = url.parse(
    "http://" + req.headers.host + req.url
  );
  console.log("request:", parsedUrl);
  if(parsedUrl.hostname !== INTERNAL_HOSTNAME){
    console.log("incorrect hostname:", parsedUrl.hostname, INTERNAL_HOSTNAME)
    res.statusCode = 401;
    return res.destroy()
  }
  if(parsedUrl.pathname !== mLtoWB.pathname){
    console.log("incorrect pathname:", parsedUrl.pathname, mLtoWB.pathname)
    res.statusCode = 401;
    return res.destroy();
  }
  console.log("update");
  mLtoWB.broadcast("update");
  res.statusCode = 200;
  res.end("{ \"status\": \"ok\"}");
});

server.on('upgrade', function upgrade(request, socket, head) {
  const parsedUrl = url.parse(
    "ws://" + request.headers.host + request.url
  );
  console.log(parsedUrl);
  if(parsedUrl.hostname !== EXTERNAL_HOSTNAME){
    console.log("incorrect hostname", parsedUrl.hostname, EXTERNAL_HOSTNAME)
    return socket.destroy()
  }
  if(parsedUrl.pathname !== mLtoWB.pathname){
    console.log("incorrect pathname:", parsedUrl.pathname, mLtoWB.pathname)
    return socket.destroy();
  }
  console.log("Websocket Success")
  mLtoWB.wsServer.handleUpgrade(request, socket, head, (ws: any)=>{
    mLtoWB.wsServer.emit('connection', ws, request);
  })
});

server.listen(process.env.INTERNAL_START_PORT);
