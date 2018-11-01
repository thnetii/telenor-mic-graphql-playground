import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';

const App = () =>
  <Router>
    <Layout>
      <Route exact={true} path='/' component={Home}/>
    </Layout>
  </Router>;

export default App;
