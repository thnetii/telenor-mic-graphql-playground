import * as React from 'react';
import { Navbar as ReactStrapNavBar, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Home as HomeIcon, Games as GamesIcon, AccountBox as UserIcon } from '@material-ui/icons';

class Navbar extends React.Component<{}, { isOpen: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.onToggle = this.onToggle.bind(this);
  }

  public render() {
    const { isOpen } = this.state;
    return (
      <ReactStrapNavBar color="dark" dark={true} expand="md" className="fixed-bottom">
        <NavbarToggler onClick={this.onToggle} />
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="mr-auto" navbar={true}>
            <NavItem>
              <NavLink exact={true} tag={RRNavLink} to="/"><HomeIcon /> <span>Home</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/counter"><GamesIcon /> <span>Counter</span></NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login"><UserIcon /> <span>Login</span></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </ReactStrapNavBar>
    );
  }

  private onToggle() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }
}

export default Navbar;
