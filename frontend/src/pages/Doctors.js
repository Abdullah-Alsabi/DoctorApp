import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Card, Nav, Button, Row, Col, Modal } from "react-bootstrap";

export default function Doctors() {
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState();
  const [specialty, setSpecialty] = useState();
  const [imgSelected, setImgSelected] = useState("");
  const [setImg, setSetImg] = useState();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("/doctor/doctors").then((res) => {
      setDoctor(res.data);
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

  function delDoc(e, _id) {
    axios.delete(`/doctor/deletedoctor/${_id}`).then((res) => {
      setDoctor(res.data);
    });
  }

  function updDoc(e, Id) {
    e.preventDefault();
    console.log(e.currentTarget);
    axios
      .put(`/doctor/updatedoctor/${Id}`, {
        name: name,
        specialty: specialty,
        pic: setImg,
      })
      .then((res) => {
        setDoctor(res.data);
      });
    console.log(Id);
  }

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {doctor.map((item) => {
          console.log(item);
          return (
            <Col>
              <Card>
                <Link to={`/appointments/${item._id}`}>
                  <Card.Img variant="top" src={item.pic} alt="docpic" />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Title>
                      {" "}
                      <h5>{item.specialty}</h5>
                    </Card.Title>
                  </Card.Body>
                </Link>
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
                    <img src={setImg} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
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
      <hr />
      <div>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        ></input>{" "}
        <br />
        <br />
        <input
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="Specialty"
        ></input>{" "}
        <br />
        <br />
        <input
          // onChange={(e) => setPic(e.target.value)}
          placeholder="pic"
        ></input>{" "}
        <br />
      </div>
      <hr />
    </div>
  );
}
