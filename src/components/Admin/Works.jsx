import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { addWork } from "../../firebase/controllers";
import { WorksMarquee } from "../About";

const Works = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(1);

  const callBack = () => {
    setLoader(false);
    setFile(null);
    handleClose();
  };

  const submithandler = async (e) => {
    e.preventDefault();
    if (file === null) return alert("Please select a file");
    setLoader(true);
    await addWork(file, setProgress, callBack);
  };
  return (
    <div className="admin-works">
      <Container>
        <div className="flex sb">
          <h1 className="title">My Works</h1>
          <Button size="sm" onClick={() => setShow(true)}>
            Add Image
          </Button>
        </div>
        <Row className="gx-10 mt-5" >
          <WorksMarquee />
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <h4>Add new Work</h4>
          <br />
          <Form onSubmit={submithandler}>
            <Form.Group controlId="formFile" className="mb-3">
              {/* <Form.Label>Add an Image</Form.Label> */}
              <Form.Control
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Form.Group>
            {loader ? (
              <ProgressBar
                style={{ height: "30px" }}
                animated
                now={progress}
                label={`uploading.. ${progress}%`}
              />
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

export default Works;
