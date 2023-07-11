import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav as BootstrapNav } from "react-bootstrap";

function Nav() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand as={Link} to="/">
        <h1>Budgeting App</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <BootstrapNav className="ml-auto">
          <BootstrapNav.Link as={Link} to="/" className="nav-link">
            Home
          </BootstrapNav.Link>
          <BootstrapNav.Link as={Link} to="/create" className="nav-link">
            New Transaction
          </BootstrapNav.Link>
        </BootstrapNav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
