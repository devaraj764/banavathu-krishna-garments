import React from "react";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { AiFillHome, AiOutlineGoogle } from "react-icons/ai";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { signInWithGoogle, Logout } from "../firebase/controllers";
import { LoginContext } from "../contexts";
import { useContext } from "react";

const NavbarComponent = ({ setPage }) => {
  const { user, setUser } = useContext(LoginContext);
  // console.log(user)

  const logout = () => {
    Logout(setUser);
  };
  return (
    <Navbar collapseOnSelect expand="sm" fixed="top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <Image
            className="navbrand-lg"
            src="./bkg-logo.svg"
            style={{ maxHeight: "100px" }}
          />
          <Image
            className="navbrand-sm"
            src="./bkg-logo-sm.svg"
            style={{ maxHeight: "40px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">
              <AiFillHome size={20} /> Home
            </Nav.Link>
            <Nav.Link href="#about">
              <BsInfoCircle size={20} />
              About
            </Nav.Link>
            <Nav.Link href="#services">
              <MdOutlineMiscellaneousServices size={22} />
              Services
            </Nav.Link>
            {user ? (
              <>
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={
                      <>
                        <FaUserCircle size={22} /> {user.name}
                      </>
                    }
                    menuVariant="dark"
                  >
                    <NavDropdown.Item href="/myorders">
                      My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <Nav.Link onClick={() => signInWithGoogle(setUser)}>
                <AiOutlineGoogle size={22} />
                SignIn
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
