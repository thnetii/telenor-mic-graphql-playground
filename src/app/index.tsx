import * as React from "react";
import { Route } from "react-router-dom";

import { BootstrapPathPrefix } from '../constants';

import Layout from "../components/layout.component";

import HomePage from "../pages/home.page";
import CounterPage from "../connected/counter.connected";

const App = () =>
  <Layout>
    <Route exact={true} path={`${BootstrapPathPrefix}/`} component={HomePage} />
    {/* <Route exact={true} path={`${BootstrapPathPrefix}/login`} component={UserLogin} /> */}
    <Route exact={true} path={`${BootstrapPathPrefix}/counter`} component={CounterPage} />
  </Layout>;

export default App;
