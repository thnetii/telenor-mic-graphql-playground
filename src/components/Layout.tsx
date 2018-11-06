import * as React from 'react';
import { Container } from 'reactstrap';
import AppNavBar from './AppNavBar';

const Layout = (props: { children: any }) =>
  <div>
    <Container fluid={true}>
      {props.children}
    </Container>
    <AppNavBar />
  </div>;

export default Layout;
