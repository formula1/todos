
const PUBLIC_UI_PORT = process.env.PUBLIC_UI_PORT;
const PUBLIC_SERVER_PROTOCOL = process.env.PUBLIC_SERVER_PROTOCOL;
const PUBLIC_SERVER_HOSTNAME = process.env.PUBLIC_SERVER_HOSTNAME;
const PUBLIC_SERVER_PORT = process.env.PUBLIC_SERVER_PORT;
const EXTERNAL_SHARED_HOSTNAME = process.env.EXTERNAL_SHARED_HOSTNAME

console.log(process.env);

type FetchDBArgs = {
  url: string,
}

type LiveDBArgs = {
  liveUrl: string
}


export {
  PUBLIC_UI_PORT,
  PUBLIC_SERVER_PROTOCOL,
  PUBLIC_SERVER_HOSTNAME,
  PUBLIC_SERVER_PORT,
  FetchDBArgs,
  LiveDBArgs,
};
