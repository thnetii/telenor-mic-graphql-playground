import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from '../components/layout';

import HomePage from '../pages/home';
import CounterPage from '../pages/counter';

const App = () =>
  <Layout>
    <Route exact={true} path={'/'} component={HomePage} />
    {/* <Route exact={true} path={'/login'} component={UserLogin} /> */}
    <Route exact={true} path={'/counter'} component={CounterPage} />
  </Layout>;

export default App;
