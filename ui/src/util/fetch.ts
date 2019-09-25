import * as fetch from "isomorphic-fetch";

enum FETCH_STATUS {
  INIT = "INIT",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

interface FETCH_STATE {
  id: null | string;
}

interface FETCH_ACTION {
  id: string;
  status: FETCH_STATUS;
}


export {
  fetch,
  FETCH_STATUS,
  FETCH_ACTION,
  FETCH_STATE
};
