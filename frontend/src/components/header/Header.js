import "./header.css";
import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import {FaHospitalUser}from 'react-icons/fa'
// import Logo from "../../doctor_appointment_booking_logo_design_4x.jpg";
const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand href="/"><FaHospitalUser className="logo"  ></FaHospitalUser> <h5 className="h5">Doctor App</h5></Navbar.Brand>
            {/* <Nav.Link href="/doctors">Doctors</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
