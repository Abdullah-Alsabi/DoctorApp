import { Card, Nav, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Appointments = () => {
  const [app, setApp] = useState([]);
  const location = useLocation();
  const appId = location.pathname.split("/")[2];

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res = await axios.get(`/doctor/doctors/${appId}`);
        setApp(res.data.appointment);
      } catch (err) {
        console.log(err);
      }
    };
    getAppointments();
  }, [app]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Appointments;
