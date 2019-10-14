import * as React from "react"
import { CenterChild } from "../css/center";
import { FullPageFollowScroll } from "../css/full-page";

import { connect } from 'react-redux'

import {
  LIGHTBOX_REDUCER_NAME,
  LightBoxState
} from "./redux/constants";

type LightBoxProps = {
  toggled: boolean,
  children: any
}

export function LightBox(props: LightBoxProps) {
  if(!props.toggled){
    return null;
  }
  return (
    <div style={(
      {
        ...FullPageFollowScroll,
        backgroundColor: "rgba(0, 0, 0, 0.3);",
      }
    )}>
      <div style={CenterChild}>
        {
          React.Children.toArray(props.children)
        }
      </div>
    </div>
  );
}


const mapStateToProps = (state: {[LIGHTBOX_REDUCER_NAME]: LightBoxState }) => {
  return {
    toggled: state[LIGHTBOX_REDUCER_NAME].toggled,
    children: state[LIGHTBOX_REDUCER_NAME].children
  }
};

const mapDispatchToProps = (dispatch: (value: any)=> any) => ({ });

const LightBoxRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(LightBox)

export { LightBoxRedux };
