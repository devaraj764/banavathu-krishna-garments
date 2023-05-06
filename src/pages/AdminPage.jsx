import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import NavbarAdmin from "../components/Admin/Navbar";
import Orders from "../components/Admin/Orders";
import Services from "../components/Admin/Services";
import Works from "../components/Admin/Works";
import { LoginContext } from "../contexts";
import { signInWithGoogle } from "../firebase/controllers";
import { AiOutlineGoogle } from "react-icons/ai";
import { Toaster } from "react-hot-toast";

const AdminPage = () => {
  const { user } = useContext(LoginContext);
  const [component, setComponent] = useState("orders");
  return (
    <div className="admin">
      {user ? (
        user.uid == "qlgQG3zngBSD3DX6M8iDuoSLDyF3" ? (
          <>
            <NavbarAdmin setComponent={setComponent} />
            {component === "orders" && <Orders />}
            {component === "works" && <Works />}
            {component === "services" && <Services />}
          </>
        ) : (
          <UnAuthorized />
        )
      ) : (
        <GoogleLogin />
      )}
      <Toaster />
    </div>
  );
};

const UnAuthorized = () => {
  return (
    <div
      className="flex"
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>UnAuthorised</h2>
    </div>
  );
};

const GoogleLogin = () => {
  const { setUser } = useContext(LoginContext);

  return (
    <div
      className="flex"
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onClick={() => signInWithGoogle(setUser)}>
        <AiOutlineGoogle size="32" /> &nbsp;Login with Google
      </Button>
    </div>
  );
};

export default AdminPage;
