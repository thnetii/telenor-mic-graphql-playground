import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home';
import Layout from './Layout';
import Counter from '../components/Counter';

const App = () =>
  <Router>
    <Layout>
      <Route exact={true} path={'/'} component={Home}/>
      <Route exact={true} path={'/counter'} component={Counter}/>
    </Layout>
  </Router>;

export default App;
