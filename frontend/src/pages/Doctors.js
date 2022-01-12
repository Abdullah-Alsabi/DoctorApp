import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Card, Nav, Button, Row, Col, Modal, Form } from "react-bootstrap";

import jwt_decode from "jwt-decode";

import Loading from "../components/header/Loading";

export default function Doctors() {
  const [loading, setloading] = useState(true);
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState();
  const [specialty, setSpecialty] = useState();
  const [imgSelected, setImgSelected] = useState("");
  const [setImg, setSetImg] = useState();
  const [id, setid] = useState(1);
  const navigate = useNavigate();
  let decodeToken = "";
  // let decodeToken = jwt_decode(localStorage.getItem("token"))

  console.log(decodeToken);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("/doctor/doctors").then((res) => {
      setDoctor(res.data);
      setloading(false);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    if (imgSelected !== "") {
      imageHandler();
    }
  }, [imgSelected]);

  const imageHandler = (e) => {
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "d7grddkn");

    console.log("image ", formData);
    axios
      .post(
        "http://api.cloudinary.com/v1_1/tuwaiq-bootcamp/image/upload",
        formData
      )
      .then((res) => {
        console.log(res.data.secure_url);
        setSetImg(res.data.secure_url);
      });
  };
  function AaddDoc() {
    axios
      .post("/doctor/createDectore", {
        name: name,
        specialty: specialty,
        pic: setImg,
        _id: id,
      })
      .then((res) => {
        console.log(res);
        setDoctor(res.data);
        setid(id + 1);
      });
  }

  function delDoc(e, _id) {
    axios.delete(`/doctor/deletedoctor/${_id}`).then((res) => {
      setDoctor(res.data);
    });
  }

  function updDoc(e, Id) {
    e.preventDefault();
    console.log(e.currentTarget);
    axios
      .patch(`/doctor/updatedoctor/${Id}`, {
        name: name,
        specialty: specialty,
        pic: setImg,
      })
      .then((res) => {
        setDoctor(res.data);
      });
    console.log(Id);
  }

  if (localStorage.getItem("token")) {
    decodeToken = jwt_decode(localStorage.getItem("token"));
  }

  if (loading) return <Loading />;

  return (
    <div className="doctor">
      <Row xs={1} md={3} className="g-4">
        {doctor.map((item) => {
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
                        delDoc(e, item._id);
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
                    <h5>{item.specialty}</h5>
                  </Card.Title>
                </Card.Body>
                <Card.Body>
                  <Button onClick={handleShow} variant="outline-secondary">
                    Update
                  </Button>{" "}
                  <Button
                    onClick={(e) => {
                      delDoc(e, item._id);
                    }}
                    variant="outline-danger"
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
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    ></input>{" "}
                    <input
                      className="updateInput"
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="Specialty"
                    ></input>{" "}
                    <input
                      type="file"
                      name="image-upload"
                      id="input"
                      accept="image/*"
                      onChange={(event) => {
                        setImgSelected(event.target.files[0]);
                      }}
                    ></input>
                    <img
                      style={{ height: "150px", width: "250px" }}
                      src={setImg}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="dark"
                      onClick={(e) => {
                        updDoc(e, item._id);
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
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="Specialty"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <input
                    type="file"
                    name="image-upload"
                    id="input"
                    accept="image/*"
                    onChange={(event) => {
                      setImgSelected(event.target.files[0]);
                    }}
                  ></input>
                  <img
                    style={{ height: "50px", width: "100px" }}
                    src={setImg}
                  />
                </Form.Group>

                <Button
                  onClick={() => {
                    AaddDoc();
                  }}
                  variant="primary"
                >
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
