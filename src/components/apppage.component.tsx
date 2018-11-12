import * as React from "react";
import {
  Divider
} from "@material-ui/core";

import PageHeader from "./pageheader.component";

const AppPage = ({ children }: { children?: React.ReactNode }) =>
  <div style={{ textAlign: "center" }}>
    <PageHeader />
    <Divider />
    {children}
  </div>;

export default AppPage;
