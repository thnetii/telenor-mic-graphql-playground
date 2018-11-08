import * as React from 'react';
import { Container } from 'reactstrap';
import Navbar from './navbar';

const Layout = (props: { children?: React.ReactNode }) =>
  <div>
    <Container fluid={true}>
      {props.children}
    </Container>
    <Navbar />
  </div>;

export default Layout;
