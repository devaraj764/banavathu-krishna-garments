import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Image,
  Button,
  Col,
  Row,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  getDocs,
  collection,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import { LoginContext } from "../contexts";
import { placeOrder, signInWithGoogle } from "../firebase/controllers";
import toast, { Toaster } from "react-hot-toast";

const Services = () => {
  return (
    <div className="services" id="services">
      <Container>
        <h1 className="title">Services</h1>
        <Row className="gx-10">
          <ServicesList />
        </Row>
      </Container>
    </div>
  );
};

export const ServicesList = () => {
  const [list, setList] = useState([]);
  const q = query(collection(firestore, "services"));
  useEffect(() => {
    getDocs(q).then((docs) => {
      setList([]);
      docs.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        setList((prev) => [...prev, data]);
      });
    });
  }, []);
  return list?.map((item, index) => <ServiceCard key={index} data={item} />);
};

const ServiceCard = ({ data }) => {
  const [show, setShow] = useState(false);
  return (
    <Col md={4} sm={12} style={{ height: "300px", padding: "10px" }}>
      <div
        className="service-card"
        style={{ backgroundImage: `url("${data.imgUrl}")` }}
      >
        <div className="middle" onClick={() => setShow(true)}>
          <div className="text">{data.title}</div>
        </div>
      </div>
      <ServiceModal data={data} show={show} setShow={setShow} />
      <Toaster />
    </Col>
  );
};

const ServiceModal = ({ data, show, setShow }) => {
  const { user, setUser } = useContext(LoginContext);
  const [loader, setLoader] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const callBack = () => {
    setLoader(false);
    toast("Order Placed");
    handleClose();
  };

  const handleButton = () => {
    if (!user) return signInWithGoogle(setUser);
    setLoader(true);
    const order = {
      clientName: user?.name,
      clientUid: user?.uid,
      serviceTitle: data?.title,
      serviceId: data?.id,
      status: 0,
      datetime: serverTimestamp(),
    };
    placeOrder(order, callBack);
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body>
        <h4>{data.title}</h4>
        <br />
        <Row>
          <Col sm={12} md={6}>
            <Image
              src={data.imgUrl}
              style={{ maxWidth: "300px", minHeight: "100px" }}
            />
          </Col>
          <Col sm={12} md={6}>
            <p style={{ margin: "20px 0" }}>{data.description}</p>
            <Button style={{ bottom: 0 }} onClick={handleButton}>
              {loader ? <Spinner animation="border" /> : "Place Order"}
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default Services;
