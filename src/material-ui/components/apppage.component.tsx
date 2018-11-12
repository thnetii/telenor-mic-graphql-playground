import * as React from "react";
import {
  Paper,
  Divider
} from "@material-ui/core";

import PageHeader from "./pageheader.component";

const AppPage = ({ children }: { children?: React.ReactNode }) =>
  <Paper>
    <PageHeader />
    <Divider />
    {children}
  </Paper>;

export default AppPage;
