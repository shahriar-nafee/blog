import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              My Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              All Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;
