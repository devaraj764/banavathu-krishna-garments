import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Image,
  ProgressBar,
} from "react-bootstrap";
import { addWork } from "../../firebase/controllers";
import toast, { Toaster } from "react-hot-toast";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";

const Works = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(1);

  const [images, setImages] = useState([]);
  const storageRef = ref(storage, "works/");

  const callBack = () => {
    setLoader(false);
    setFile(null);
    toast("Added your work");
    getImages();
    handleClose();
  };

  const submithandler = async (e) => {
    e.preventDefault();
    if (file === null) return alert("Please select a file");
    setLoader(true);
    await addWork(file, setProgress, callBack);
  };

  useEffect(() => {
    getImages();
  }, []);

  const getImages = ()=>{
    listAll(storageRef).then((res) => {
      res.items.forEach((item) => {
        setImages([]);
        getDownloadURL(item).then((url) => {
          setImages((prev) => [...prev, url]);
        });
      });
    });
  }

  return (
    <div className="admin-works">
      <Toaster />
      <Container>
        <div className="flex sb">
          <h1 className="title">My Works</h1>
          <Button size="sm" onClick={() => setShow(true)}>
            Add Image
          </Button>
        </div>
        <Row className="gx-10 mt-5">
          {images.map((url, index) => (
            <Col key={index} md={4} sm={12} className="p-4 flex"style={{justifyContent:'center'}}>
              <Image src={url} className="works" fluid />
            </Col>
          ))}
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
