import { Promise } from "../../../../util/promise"

export function waitForWindow(): Promise<Window>{
  return Promise.race([
      new Promise((res, rej)=>{
      if(document.readyState === "complete"){
        return res(window)
      }
      function loadListener(){
        window.removeEventListener("load", loadListener)
        res(window)
      }
      window.addEventListener("load", loadListener)
    }),
    new Promise((res, rej)=>{
      setTimeout(()=>{rej(new Error("timeout"))}, 10*1000);
    })
  ])
}
