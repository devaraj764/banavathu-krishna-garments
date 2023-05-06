import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Modal,
  Badge,
  Image,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  serverTimestamp,
  doc,
} from "@firebase/firestore";
import { firestore } from "../../firebase";
// import {sendMail} from "../../services/mailer";

const getUserData = async (uid) => {
  try {
    const q = query(
      collection(firestore, "users"),
      where("uid", "==", uid),
      orderBy("datetime", "desc"),
      limit(10)
    );
    const docs = await getDocs(q);
    if (docs.docs.length !== 0) {
      return docs.docs[0].data();
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const Orders = () => {
  const [list, setList] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [user, setUser] = useState(null);

  const q = query(collection(firestore, "orders"));

  const handleUserModalClose = () => {
    setUserModal(false);
  };

  const handleUserModalClick = async (uid) => {
    try {
      const userdata = await getUserData(uid);
      setUser(userdata);
      setUserModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    getDocs(q).then((docs) => {
      setList([]);
      docs.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        setList((prev) => [...prev, data]);
      });
    });
  };

  const acceptOrder = async (docid) => {
    try {
      const docRef = doc(firestore, "orders", docid);
      await updateDoc(docRef, {
        status: 1,
        acceptedTimestamp: serverTimestamp(),
      });
      // await sendMail({ user, subject: "Order Accepted", orderId: docid });
    } catch (err) {
      console.error(err);
    }
  };

  const rejectOrder = async (docid) => {
    try {
      const docRef = doc(firestore, "orders", docid);
      await updateDoc(docRef, {
        status: -1,
        rejectedTimestamp: serverTimestamp(),
      });
      // await sendMail({ user, subject: "Order Rejected", orderId: docid });
    } catch (err) {
      console.error(err);
    }
  };

  const completeOrder = async (docid) => {
    try {
      const docRef = doc(firestore, "orders", docid);
      await updateDoc(docRef, {
        status: 2,
        completedTimestamp: serverTimestamp(),
      });
      // await sendMail({ user, subject: "Order Completed", orderId: docid });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="orders">
      <Container>
        <div className="flex sb">
          <div className="flex sb">
            <h1 className="title">Orders</h1>
            <Button onClick={getOrders}>Reload Orders</Button>
          </div>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>User Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceTitle}</td>
                <td
                  onClick={() => handleUserModalClick(item.clientUid)}
                  style={{ cursor: "pointer" }}
                >
                  {item.clientName}
                </td>
                <td>
                  {item.status === 0 && <Badge bg="warning">Placed</Badge>}
                  {item.status === 1 && <Badge bg="primary">Accepted</Badge>}
                  {item.status === 2 && <Badge bg="success">Completed</Badge>}
                  {item.status === -1 && <Badge bg="danger">Rejected</Badge>}
                </td>
                <td>
                  {item.status === 0 && (
                    <>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => acceptOrder(item.id)}
                      >
                        Accept
                      </Button>
                      &nbsp;
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => rejectOrder(item.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {item.status === 1 && (
                    <Button
                      size="sm"
                      bg="success"
                      onClick={() => completeOrder(item.id)}
                    >
                      Complete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <UserModal
        user={user}
        show={userModal}
        handleClose={handleUserModalClose}
      />
    </div>
  );
};

const UserModal = ({ user, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Body>
        <Row>
          <Col sm={12} md={3}>
            <Image src={user?.profileUrl} fluid />
          </Col>
          <Col sm={12} md={9}>
            <p>
              Name:
              <br />
              <b>{user?.name}</b>
            </p>
            <p>
              Email:
              <br />
              <b>{user?.email}</b>
            </p>
            <p>
              Mobile:
              <br />
              <b>{user?.phoneNumber}</b>
            </p>
            <p>
              Address:
              <br />
              <b>{user?.address}</b>
            </p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default Orders;
