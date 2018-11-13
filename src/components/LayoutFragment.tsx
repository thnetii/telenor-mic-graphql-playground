import * as React from "react";

import AppNavbar from "./AppNavbar";

const LayoutFragment = (props: { children?: React.ReactNode }) =>
  <React.Fragment>
    {props.children}
    <AppNavbar />
  </React.Fragment>;

export default LayoutFragment;
