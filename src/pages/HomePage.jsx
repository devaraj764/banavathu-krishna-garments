import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { LoginContext } from "../contexts";
import { useContext } from "react";
import { useEffect, useState } from "react";
import MobileAndAddressModal from "../components/DetailsModal";

const HomePage = () => {
  const { user } = useContext(LoginContext);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (user && !user.phoneNumber) {
      setShowDetails(true);
    }
  }, [user]);
  return (
        <>
          <Navbar />
          <Banner />
          <About />
          <Services />
          <Footer />
          <MobileAndAddressModal
            show={showDetails}
            handleClose={() => setShowDetails(false)}
          />
        </>
  );
};

export default HomePage;
