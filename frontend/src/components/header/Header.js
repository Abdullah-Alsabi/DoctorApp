import "./header.css";
import React from "react";
import { Navbar, Nav, Button, Container, Row } from "react-bootstrap";
import { FaHospitalUser } from "react-icons/fa";
// import Logo from "../../doctor_appointment_booking_logo_design_4x.jpg";

const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand
              className="d-flex  justify-content-between  "
              href="/"
            >
              <FaHospitalUser></FaHospitalUser>{" "}
              <h5 className=" ">Doctor App</h5>
            </Navbar.Brand>
            <Container className="d-flex justify-content-center ">
              {" "}
              <Nav.Link
                className="d-flex flex-column justify-content-center"
                href="/doctors"
              >
                {" "}
                <h5 className="h5">Doctors </h5>
              </Nav.Link>
              <Nav.Link
                className="d-flex flex-column justify-content-center"
                href="/patients"
              >
                {" "}
                <h5 className="h5">Patients </h5>
              </Nav.Link>
              <Nav.Link
                className="d-flex flex-column justify-content-center"
                href="/Login"
              >
                {" "}
                <h5 className="h5">Login</h5>
              </Nav.Link>
            </Container>
            {/* <Nav.Link href="/doctors">Doctors</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
