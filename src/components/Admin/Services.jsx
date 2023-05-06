import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { addNewService } from "../../firebase/controllers";
import { ServicesList } from "../Services";

const Services = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // value states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(1);

  const callBack = () => {
    setLoader(false);
    setTitle('');
    setDescription('');
    setFile(null);
    handleClose();
  };

  const submithandler = async (e) => {
    e.preventDefault();
    if (title === "") return alert("Please select a title");
    if (description === "") return alert("Please select a description");
    if (file === null) return alert("Please select a file");
    setLoader(true);
    const data = {
      title,
      description,
      datetime: Date.now(),
    };
    await addNewService(data, file, setProgress, callBack);
  };

  return (
    <div className="admin-services" id="services">
      <Container>
        <div className="flex sb">
          <h1 className="title">Services</h1>
          <Button size="sm" onClick={() => setShow(true)}>
            Add new Service
          </Button>
        </div>
        <Row className="gx-10">
          <ServicesList/>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <h4>Add New Service</h4>
          <br />
          <Form onSubmit={submithandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title of the new service"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              defaultValue={description}
              controlId="exampleForm.ControlTextarea1"
              onChange={(e) => setDescription(e.target.value)}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter short description about the service"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Add an Image</Form.Label>
              <Form.Control
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Form.Group>
            {loader ? (
              <ProgressBar animated now={progress} label={`${progress}%`} />
            ) : (
              <Form.Control
                type="submit"
                placeholder="Enter the title of the new service"
                value={"Submit"}
                disabled={loader}
              />
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Services;
