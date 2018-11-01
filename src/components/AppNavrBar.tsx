import * as React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavBar = () =>
  <Navbar inverse={true} fixedBottom={true} fluid={true} collapseOnSelect={true}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}><Glyphicon glyph={'home'}/> MIC GraphQL Playground</Link>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/login'}>
          <NavItem>
            <Glyphicon glyph={'user'}/> Login
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/counter'}>
          <NavItem>
            <Glyphicon glyph={'education'}/> Counter
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export default AppNavBar;
