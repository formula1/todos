
const LIGHTBOX_REDUCER_NAME = "LIGHTBOX";

enum LIGHTBOX_ACTIONS {
  ENABLE = "LIGHTBOX_ENABLE",
  DISABLE = "LIGHTBOX_DISABLE"
}

interface LightBoxState {
  toggled: boolean,
  children: any
};


type LightBoxAction = {
  type: LIGHTBOX_ACTIONS.ENABLE,
  children: any
} | {
  type: LIGHTBOX_ACTIONS.DISABLE,
};

export {
  LIGHTBOX_REDUCER_NAME,
  LIGHTBOX_ACTIONS,
  LightBoxState,
  LightBoxAction
}
