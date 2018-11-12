import * as React from "react";
import {
  Paper,
  Typography,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

import AppPage from "../components/apppage.component";

const HomePage = () =>
  <AppPage>
    <Paper className="mx-auto">
      <Typography variant="h5" component="h3">
        <WarningIcon className="mr-1" />
        BETA functionality!
      </Typography>
      <Typography variant="body1">GraphQL support is currently still in development and not supported for production by Telenor Connexion!</Typography>
    </Paper>
    <Typography variant="body1">Welcome to the Managed IoT GraphQL Playground!</Typography>
  </AppPage>;

export default HomePage;
