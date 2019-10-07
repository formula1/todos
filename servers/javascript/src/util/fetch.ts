import fetch from "isomorphic-fetch";

export function handleResponse(response: any){
  return response.json().then((json: any)=>{
    if(response.ok){
      return json;
    }
    throw json;
  })
}

export function jsonToFormData(json: any): FormData{
  const formData = new FormData();
  const keys = Object.keys(json);
  keys.forEach((key)=>{
    formData.set(key, json[key])
  });
  return formData;
}


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
