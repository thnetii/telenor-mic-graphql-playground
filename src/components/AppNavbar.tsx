import * as React from "react";
import {
  NavLink as RouterLink
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import HomeIcon from "@material-ui/icons/Home";
import CounterIcon from "@material-ui/icons/School";
import LoginIcon from "@material-ui/icons/AccountBox";

class AppNavbar extends React.Component<{}, { isOpen: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = { isOpen: false };

    this.onToggle = this.onToggle.bind(this);
  }

  public render() {
    const { isOpen } = this.state;
    return (
      <Navbar color="dark" dark={true} expand="sm" className="fixed-bottom">
        <NavbarToggler onClick={this.onToggle} />
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="mr-auto" navbar={true}>
            <NavItem>
              <NavLink exact={true} tag={RouterLink} to="/">
                <HomeIcon className="mr-1" />
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterLink} to="/counter">
                <CounterIcon className="mr-1" />
                Counter
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink tag={RouterLink} to="/user">
                Login
                <LoginIcon className="ml-1" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  private onToggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }
}

export default AppNavbar;
