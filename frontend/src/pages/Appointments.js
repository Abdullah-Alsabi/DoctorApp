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
  }, []);


  return (
    <div className="appointments">
      {app.map((item) => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>{item.patientName}</Card.Title>
              <Card.Text>
                {item.date}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}

      <div className="addAppointments">+</div>
    </div>
  );
};

export default Appointments;
