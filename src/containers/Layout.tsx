import * as React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavBar from '../components/AppNavBar';

const Layout = (props: { children: any}) =>
  <Grid fluid={true}>
    {props.children}
    <AppNavBar/>
  </Grid>;

export default Layout;
