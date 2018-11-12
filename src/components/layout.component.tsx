import * as React from "react";
import { CssBaseline } from "@material-ui/core";

import Navbar from "./navbar.component";

const Layout = (props: { children?: React.ReactNode }) =>
  <main>
    <CssBaseline />
    {props.children}
    <Navbar />
  </main>;

export default Layout;
