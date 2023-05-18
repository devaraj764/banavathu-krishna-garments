import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import { useContext } from "react";
import { LoginContext } from "../contexts";
import { Container, Table, Badge, Button } from "react-bootstrap";
// import { BiHomeAlt2 } from "react-icons/bi";
import NavbarComponent from "../components/Navbar";
import { BsWhatsapp } from "react-icons/bs";
import { signInWithGoogle } from "../firebase/controllers";

const MyOrders = () => {
  const { user, setUser } = useContext(LoginContext);
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (user) getOrders(user.uid);
  }, [user]);

  if (!user)
    return (
      <div>
        <Button onClick={() => signInWithGoogle(setUser)}>Google Login</Button>
      </div>
    );

  const getOrders = async (uid) => {
    const q = query(
      collection(firestore, "orders"),
      where("clientUid", "==", uid)
      // orderBy("datetime", "desc"),
      // limit(10)
    );
    const docs = await getDocs(q);
    if (docs.docs.length !== 0) {
      setList([]);
      docs.docs.forEach((item) => {
        const data = { ...item.data(), id: item.id };
        setList((prev) => [...prev, data]);
      });
    }
    setLoader(false);
  };

  const redirectToWhatsap = async (service) => {
    const message = `Hi, I am ${user.name}. I want ${service}. Please tell me what are the requirements, I need to provide`;
    const mobileNumber = "+917997440602";
    let number = mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");
    let url = `https://wa.me/${number}?text=${message}`
    // let url = `https://web.whatsapp.com/send?phone=${number}&text=${message}&app_absent=0`;
    window.open(url, "_blank", "rel=noopener noreferrer");
  };
  return (
    <Container>
      <NavbarComponent />
      <div className="flex sb" style={{ marginTop: "150px" }}>
        <h1 className="title">Orders</h1>
        <div className="flex" style={{ gap: "20px", alignItems: "center" }}>
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
            <th>Chat</th>
          </tr>
        </thead>
        <tbody>
          {loader ? (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          ) : (
            list.length > 0 &&
            list?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceTitle}</td>
                <td>{Date(item.timestamp)}</td>
                <td>
                  {item.status === 0 && <Badge bg="warning">Placed</Badge>}
                  {item.status === 1 && <Badge bg="primary">Accepted</Badge>}
                  {item.status === 2 && <Badge bg="success">Completed</Badge>}
                  {item.status === -1 && <Badge bg="danger">Rejected</Badge>}
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="flex"
                    style={{ fontSize: "12px" }}
                    onClick={() => redirectToWhatsap(item.serviceTitle)}
                  >
                    <BsWhatsapp size={16} /> &nbsp;WhatsApp
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyOrders;
