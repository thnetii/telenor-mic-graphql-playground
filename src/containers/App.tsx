import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import Layout from './Layout';
import Counter from '../components/Counter';

const App = () =>
  <Layout>
    <Route exact={true} path={'/'} component={Home} />
    <Route path={'/counter'} component={Counter} />
  </Layout>;

export default App;
