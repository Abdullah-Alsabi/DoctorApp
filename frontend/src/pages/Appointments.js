import { Card, Nav, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Appointments = () => {
  const [app, setApp] = useState([]);
  const [date, setDate] = useState();
  const [patient, setPatient] = useState();
  const [reason, setReason] = useState();
  const [dr, setDr] = useState();
  const [pid, setPid] = useState();

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

  const handleSubmit = () => {
    console.log(date);
    console.log(patient);
    console.log(reason);
    console.log(dr);
  };
  return (
    <div className="appointments">
      {/* {app.map((item) => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>{item.patientName}</Card.Title>
              <Card.Text>{item.date}</Card.Text>
            </Card.Body>
          </Card>
        );
      })} */}

      <div className="addAppointments">+</div>
      <div className="form-group">
        <label>Date</label>
        <input
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter Date"
        />
      </div>
      <div className="form-group">
        <label>patient name</label>
        <input
          className="form-control"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Enter patient Name"
        />
      </div>
      <div className="form-group">
        <label>reason For Appointment</label>
        <input
          className="form-control"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason For Appointment"
        />
      </div>
      <div className="form-group">
        <label>Dr ID</label>
        <input
          className="form-control"
          value={dr}
          onChange={(e) => setDr(e.target.value)}
          placeholder="Enter Dr ID"
        />
      </div>
      <div className="form-group">
        <label>patient ID</label>
        <input
          className="form-control"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          placeholder="Enter Patient ID"
        />
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  );
};

export default Appointments;
