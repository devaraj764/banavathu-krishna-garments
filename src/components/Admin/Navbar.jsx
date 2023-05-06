import { Navbar, Container, Nav } from "react-bootstrap";
import { HiLogout } from "react-icons/hi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiCountingworkspro } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { BsFillBoxFill } from "react-icons/bs";
import { Logout } from "../../firebase/controllers";
import { LoginContext } from "../../contexts";
import { useContext } from "react";

const NavbarAdmin = ({ setComponent }) => {
  const { setUser } = useContext(LoginContext);

  const logout = () => {
    Logout(setUser);
  };

  return (
    <Navbar collapseOnSelect expand="sm" fixed="top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-5">
            <Nav.Link
              onClick={() => setComponent("orders")}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <BsFillBoxFill size={20} /> Orders
            </Nav.Link>
            <Nav.Link
              onClick={() => setComponent("works")}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <SiCountingworkspro size={20} />
              Works
            </Nav.Link>
            <Nav.Link
              onClick={() => setComponent("services")}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <MdOutlineMiscellaneousServices size={22} />
              Services
            </Nav.Link>
            <Nav.Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <CgWebsite size={20} /> Main
            </Nav.Link>
            <Nav.Link
              onClick={logout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "tomato",
              }}
            >
              <HiLogout size={22} />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
