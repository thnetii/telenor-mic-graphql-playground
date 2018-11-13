import * as React from "react";
import { Route } from "react-router-dom";

import LayoutFragment from "../components/LayoutFragment";

import HomeView from "../views/HomeView";
import UserView from "../views/UserView";
import CounterView from "../views/CounterView";

const App = () =>
  <LayoutFragment>
    <Route exact={true} path="/" component={HomeView} />
    <Route exact={true} path="/user" component={UserView} />
    <Route exact={true} path="/counter" component={CounterView} />
  </LayoutFragment>;

export default App;
