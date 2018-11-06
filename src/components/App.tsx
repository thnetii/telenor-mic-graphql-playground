import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';
import Counter from './Counter';

const App = () =>
  <Layout>
    <Route exact={true} path={'/'} component={Home} />
    <Route path={'/counter'} component={Counter} />
  </Layout>;

export default App;
