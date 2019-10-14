import { CSSProperties } from "react";

export const CenterParent: CSSProperties = {
  display: "flex", // make us of Flexbox
  alignItems: "center", // does vertically center the desired content
  justifyContent: "center", // horizontally centers single line items
  textAlign: "center", // optional, but helps horizontally center text that breaks into multiple lines
}

export const CenterChild: CSSProperties = {
  margin: "auto",
  position: "absolute",
  top: 0, left: 0, bottom: 0, right: 0,
}

export const CenterChild2: CSSProperties = {
  display: "inline-block",
  position: "relative",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}
