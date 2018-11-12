import * as React from "react";
import {
  Typography
} from "@material-ui/core";

const PageHeader = () =>
  <React.Fragment>
    <Typography variant="h2" component="h1">Telenor Connexion Managed IoT Cloud</Typography>
    <Typography variant="h4" component="h2" color="textSecondary">Interactive GraphQL Playground</Typography>
  </React.Fragment>;

export default PageHeader;
