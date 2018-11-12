import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import {
  BootstrapPathPrefix,
  MuiPathPrefix
} from "./constants";

import App from "./app";
import MuiApp from "./material-ui/app";

import { history } from "./helpers/history";
import { store } from "./helpers/store";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Route path={`${BootstrapPathPrefix}/`} component={App} />
        <Route path={`${MuiPathPrefix}/`}component={MuiApp} />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
