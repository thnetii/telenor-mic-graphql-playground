import * as React from "react";

import Navbar from "./navbar.component";

const Layout = (props: { children?: React.ReactNode }) =>
  <div>
    {props.children}
    <Navbar />
  </div>;

export default Layout;
