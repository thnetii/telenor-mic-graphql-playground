import * as React from "react";
import {
  NavLink as RouterLink
} from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar as ReactStrapNavbar,
  NavbarToggler,
} from "reactstrap";
import {
  Home as HomeIcon,
  Games as GamesIcon,
  AccountBox as UserIcon
} from '@material-ui/icons';

import { BootstrapPathPrefix } from '../constants';

class Navbar extends React.Component<{}, { isOpen: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = { isOpen: false };

    this.onToggle = this.onToggle.bind(this);
  }

  public render() {
    const { isOpen } = this.state;
    return (
      <ReactStrapNavbar color="dark" dark={true} expand="sm" className="fixed-bottom">
        <NavbarToggler onClick={this.onToggle} />
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="mr-auto" navbar={true}>
            <NavItem>
              <NavLink exact={true} tag={RouterLink} to={`${BootstrapPathPrefix}/`}><HomeIcon /> Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterLink} to={`${BootstrapPathPrefix}/counter`}><GamesIcon /> Counter</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink tag={RouterLink} to={`${BootstrapPathPrefix}/login`}><UserIcon /> Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </ReactStrapNavbar>
    );
  }

  private onToggle() {
    const state = this.state;
    const { isOpen } = state;
    this.setState({
      ...state,
      isOpen: !isOpen
    });
  }
}

export default Navbar;
