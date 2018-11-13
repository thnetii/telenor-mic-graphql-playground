import * as React from "react";
import { Route } from "react-router-dom";

import Layout from "../components/layout.component";

import HomeView from "../views/home.view";
import LoginView from "../views/login.view";
import CounterView from "../views/counter.view";

const App = () =>
  <Layout>
    <Route exact={true} path="/" component={HomeView} />
    <Route exact={true} path="/login" component={LoginView} />
    <Route exact={true} path="/counter" component={CounterView} />
  </Layout>;

export default App;
