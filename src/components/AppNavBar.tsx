import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Home as HomeIcon, Games as GamesIcon } from '@material-ui/icons';

import { GlobalState } from '../types';
import { AppNavBarProps, AppNavBarRouterState } from '../types/AppNavBar';
import { AppNavBarActionCreators } from '../actions/AppNavBar';

const AppNavBar = (props: AppNavBarProps) =>
  <Navbar color="dark" dark={true} expand="md" className="fixed-bottom">
    <NavbarToggler onClick={props.onToggle} />
    <Collapse isOpen={props.isOpen} navbar={true}>
      <Nav className="mr-auto" navbar={true}>
        <NavItem active={props.location.pathname === '/'}>
          <NavLink tag={RRNavLink} to="/"><HomeIcon /> <span>Home</span></NavLink>
        </NavItem>
        <NavItem active={props.location.pathname.toLowerCase() === '/counter'}>
          <NavLink tag={RRNavLink} to="/counter"><GamesIcon /> <span>Counter</span></NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>;

export default connect(
  (state: GlobalState): AppNavBarRouterState => ({
    ...state.appNavBar,
    ...state.router
  }),
  dispatch => bindActionCreators(AppNavBarActionCreators, dispatch)
)(AppNavBar);
