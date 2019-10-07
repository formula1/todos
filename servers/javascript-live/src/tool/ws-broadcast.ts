import { WebSocket, WebSocketServer } from "../util/websocket";
import { uniqueID } from "../util/db-tools"

type IdWebSocket = WebSocket & { id: string };

export class WsBroadcaster {
  pathname: string;
  dbName: string;
  collectionName: string
  wsServer: WebSocketServer;
  wsClients: {
    [key: string]: IdWebSocket
  } = {}
  constructor(dbName: string, collectionName: string){
    this.pathname = `/mongodb/${dbName}/${collectionName}`;
    this.dbName = dbName,
    this.collectionName = collectionName

    this.wsServer = new WebSocket.Server({ noServer: true });
    this.wsServer.on('connection', (ws: WebSocket)=>{
      const idWs = ws as IdWebSocket;
      idWs.id = uniqueID();
      this.wsClients[idWs.id] = idWs;
      idWs.onclose = ()=>{
        delete this.wsClients[idWs.id];
      };
    });
  }

  broadcast(message: string){
    Object.keys(this.wsClients).forEach((id)=>{
      this.wsClients[id].send(message)
    })
  }

  public close(){
    this.wsServer.close()
  }
}
