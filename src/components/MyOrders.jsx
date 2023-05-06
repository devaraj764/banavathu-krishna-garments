import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useContext } from "react";
import { LoginContext } from "../contexts";
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
import { BiHomeAlt2 } from "react-icons/bi";

const MyOrders = () => {
  const { user, setUser } = useContext(LoginContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (user) getOrders(user.uid);
  }, []);

  const getOrders = async (uid) => {
    const q = query(
      collection(firestore, "orders"),
      where("clientUid", "==", uid)
      );
      console.log(uid);
    const docs = await getDocs(q);
    if (docs.docs.length !== 0) {
      setList([])
      docs.docs.forEach((item) => {
        const data = { ...item.data(), id: item.id };
        setList((prev) => [...prev, data]);
      });
    }
  };
  return (
    <Container style={{ marginTop: "50px" }}>
      <div className="flex sb">
        <h1 className="title">Orders</h1>
        <div className="flex" style={{ gap: "20px", alignItems: "center" }}>
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <BiHomeAlt2 />
            Home
          </a>
          <Button onClick={getOrders}>Reload Orders</Button>
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Service Name</th>
            <th>timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceTitle}</td>
                <td
                >
                  {Date(item.timestamp)}
                </td>
                <td>
                  {item.status === 0 && <Badge bg="warning">Placed</Badge>}
                  {item.status === 1 && <Badge bg="primary">Accepted</Badge>}
                  {item.status === 2 && <Badge bg="success">Completed</Badge>}
                  {item.status === -1 && <Badge bg="danger">Rejected</Badge>}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyOrders;