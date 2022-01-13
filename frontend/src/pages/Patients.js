import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";

import jwt_decode from "jwt-decode";

import Loading from "../components/header/Loading";

export default function Patients() {
  const [loading, setloading] = useState(true);
  const [patient, setPatient] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();
  let decodeToken = "";
  // let decodeToken = jwt_decode(localStorage.getItem("token"))

  console.log(decodeToken);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("/patient").then((res) => {
      setPatient(res.data);
      setloading(false);
      console.log(res.data);
    });
  }, []);

  function addPatient() {
    axios.post("/patient", { id, name, age }).then((res) => {
      console.log(res);
      setPatient(res.data);
    });
  }

  function deletePatient(e, _id) {
    axios.delete(`/patient/${_id}`).then((res) => {
      setPatient(res.data);
    });
  }

  function updatePatient(e, Id) {
    e.preventDefault();
    console.log(e.currentTarget);
    axios.put(`/patient/${Id}`, { id, name, age }).then((res) => {
      setPatient(res.data);
    });
    console.log(Id);
  }

  if (localStorage.getItem("token")) {
    decodeToken = jwt_decode(localStorage.getItem("token"));
  }

  if (loading) return <Loading />;
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    navigate(`/patient/${e.target[0].value}`);
  };
  return (
    <div className="doctor">
      <Row>
        <Form onSubmit={handleSearch}>
          <Form.Control
            placeholder="Search for a patient"
            onChange={(e) => console.log(e.target.value)}
          />
          <button type="submit" className="btn btn-warning">
            <svg width="15px" height="15px">
              <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
            </svg>
          </button>
        </Form>
      </Row>
      <Row xs={1} md={2} className="g-4">
        {patient.map((item) => {
          console.log(item);
          return (
            <Col>
              <Card>
                <Link to={`/appointments/${item._id}`}>
                  <Card.Img
                    style={{ height: "250px", width: "400px" }}
                    variant="top"
                    src={item.pic}
                    alt="docpic"
                  />
                </Link>
                {decodeToken.isAdmin && (
                  <Card.Body>
                    <Button onClick={handleShow} variant="outline-primary">
                      Update
                    </Button>{" "}
                    <Button
                      onClick={(e) => {
                        deletePatient(e, item._id);
                      }}
                      variant="outline-primary"
                    >
                      Delete
                    </Button>{" "}
                  </Card.Body>
                )}

                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Title>
                    {" "}
                    <h5>{item.age}</h5>
                  </Card.Title>
                </Card.Body>
                <Card.Body>
                  <Button onClick={handleShow} variant="outline-primary">
                    Update
                  </Button>{" "}
                  <Button
                    onClick={(e) => {
                      deletePatient(e, item._id);
                    }}
                    variant="outline-primary"
                  >
                    Delete
                  </Button>{" "}
                </Card.Body>
              </Card>
              <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      className="updateInput"
                      type="number"
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                      placeholder="id"
                    ></input>
                    <input
                      className="updateInput"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    ></input>{" "}
                    <input
                      className="updateInput"
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      type="number"
                    ></input>{" "}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        updatePatient(e, item._id);
                        handleClose();
                      }}
                    >
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </Col>
          );
        })}
      </Row>

      <div className="add">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Add Doctors</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    onChange={(e) => setId(e.target.value)}
                    placeholder="id"
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="age"
                    type="number"
                  />
                </Form.Group>

                <Button onClick={() => addPatient()} variant="primary">
                  Add
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}