import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import "./styles/global.css";
import { useState, useEffect } from "react";
import { LoginContext } from "./contexts";
import { getUser } from "./firebase/controllers";
import MyOrders from "./pages/MyOrders";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("bkuserid");
    if (!user && storedUser) {
      getUser(setUser)
    }
    else if (user && !storedUser) localStorage.setItem("bkuserid", user.uid);
    else if (!user && storedUser) localStorage.removeItem("bkuserid");
    
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/myorders" Component={MyOrders} />
        <Route
          path="/admin"
          Component={
            AdminPage
          }
        />
        <Route
          path="/admin/:page"
          Component={
            AdminPage
          }
        />
      </Routes>
    </LoginContext.Provider>
  );
}



export default App;
