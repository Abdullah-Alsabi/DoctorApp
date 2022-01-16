import { Card, Nav, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Patient = () => {
  const [chosenPatient,setChosenPatient]=useState({})
  const [patient, setPatient] = useState([]);
  const location = useLocation();
  const patientId = location.pathname.split("/")[2];

  useEffect(() => {
      console.log('location.pathname.split("/")[2]',location.pathname.split("/")[2])
    const getPatient = async () => {
      try {
        const res = await axios.get(`/patient/${patientId}`);
        setPatient(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPatient();
  }, []);


  return (
    <div className="appointments">
      {
          <Card>
            <Card.Body>
              <Card.Title>{patient.name}</Card.Title>
              <Card.Text>
                {patient.age}
              </Card.Text>
            </Card.Body>
          </Card>
        }

      <div className="addAppointments">+</div>
    </div>
  );
};

export default Patient;
