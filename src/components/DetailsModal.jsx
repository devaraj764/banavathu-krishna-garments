import { Modal, Form, ProgressBar, Spinner } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { firestore } from "../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { LoginContext } from "../contexts";
import { getUser } from "../firebase/controllers";

const MobileAndAddressModal = ({ show, handleClose }) => {
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const { user, setUser } = useContext(LoginContext);
  const [loader, setLoader] = useState(false);

  const submithandler = async (e) => {
    e.preventDefault();
    if (!mobile) return alert("Please enter mobile number");
    if (!address) return alert("Please enter address");
    setLoader(true);
    const data = {
      phoneNumber: mobile,
      address: address,
    };
    const docRef = doc(firestore, "users", user.id);
    await updateDoc(docRef, data);
    getUser(setUser);
    setLoader(false);
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Fill the Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submithandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your 10-digit mobile number"
              max={10}
              defaultValue={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            defaultValue={address}
            controlId="exampleForm.ControlTextarea1"
            onChange={(e) => setAddress(e.target.value)}
          >
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your address"
            />
          </Form.Group>
          <Form.Control
            type="submit"
            placeholder="Enter the title of the new service"
            value={loader ? "wait..." : "Submit"}
            disabled={loader}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MobileAndAddressModal;
