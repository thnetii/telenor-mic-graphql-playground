import "../style/layout.css";

import * as React from "react";
import {
  Container
} from "reactstrap";

import PageHeader from "./PageHeader";

const AppPage = ({ children }: { children?: React.ReactNode }) =>
  <Container fluid={true} id="content" className="text-center">
    <PageHeader />
    <hr />
    {children}
  </Container>;

export default AppPage;
