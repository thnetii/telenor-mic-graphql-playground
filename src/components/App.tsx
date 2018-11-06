import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';
import Counter from './Counter';
import UserLogin from './UserLogin';

const App = () =>
  <Layout>
    <Route exact={true} path={'/'} component={Home} />
    <Route exact={true} path={'/login'} component={UserLogin} />
    <Route exact={true} path={'/counter'} component={Counter} />
  </Layout>;

export default App;
