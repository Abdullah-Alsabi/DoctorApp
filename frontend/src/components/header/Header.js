import "./header.css";
import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
// import Logo from "../../doctor_appointment_booking_logo_design_4x.jpg";
const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Nav.Link href="/doctors">Doctors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
