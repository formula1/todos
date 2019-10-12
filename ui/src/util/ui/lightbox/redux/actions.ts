import { LIGHTBOX_ACTIONS, } from "./constants";

export function c_enableLightBox(children: any){
  return {
    type: LIGHTBOX_ACTIONS.ENABLE,
    children: children
  }
}

export function d_disableLightBox(){
  return {
    type: LIGHTBOX_ACTIONS.DISABLE
  }
}
