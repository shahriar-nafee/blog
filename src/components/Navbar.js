import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
function Topbar() {
  return (
    <div>
      <Navbar collapseOnSelect fixed="top" bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="/">Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-auto">
              <Nav.Link eventKey="0" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link eventKey="1" as={Link} to="/profile">
                My Profile
              </Nav.Link>
              <Nav.Link eventKey="2" as={Link} to="/users">
                All Users
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Topbar;
