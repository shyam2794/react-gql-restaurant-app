import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import logo from "../Images/logo.png";

const styles = {
  navborder: {
    marginTop: "7px",
    padding: "0px 15px"
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  headerColor: {
    backgroundColor: "black !important"
  }
};

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  userLogout() {
    localStorage.removeItem("id");
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Navbar
          style={styles.headerColor}
          className="fixed-top"
          color="dark"
          expand="md"
        >
          <NavbarBrand style={styles.link} href="/">
            <img src={logo} alt="" /> Billing Software
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={styles.navborder}>
                <Link style={styles.link} to="/Home">
                  Home
                </Link>
              </NavItem>
              <NavItem style={styles.navborder}>
                <Link style={styles.link} to="/Booking">
                  Booking
                </Link>
              </NavItem>
              <NavItem style={styles.navborder}>
                <Link style={styles.link} to="/Menu">
                  Menu
                </Link>
              </NavItem>
              <NavItem style={styles.navborder}>
                <Link style={styles.link} to="/bills">
                  Billing
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={styles.link} nav caret>
                  Profile
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.userLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Example);
