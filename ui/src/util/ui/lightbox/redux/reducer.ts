import {
  LIGHTBOX_REDUCER_NAME,
  LIGHTBOX_ACTIONS,
  LightBoxState,
  LightBoxAction
} from "./constants";

const DEFAULT_STATE: LightBoxState = {
  toggled: false,
  children: void 0
};

function reducer(state: LightBoxState = DEFAULT_STATE, action: LightBoxAction) {
  switch (action.type) {
    case LIGHTBOX_ACTIONS.ENABLE:
      return {
        toggled: true,
        children: action.children
      };
    case LIGHTBOX_ACTIONS.DISABLE:
      return {
        toggled: false,
        children: void 0
      }
    default:
      return state
  }
}

export default reducer;
