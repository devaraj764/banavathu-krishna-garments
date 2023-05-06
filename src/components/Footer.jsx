import React from "react";
import { MdCall } from "react-icons/md";

const Footer = () => {
  const d = new Date(Date.now());
  let year = d.getFullYear();
  return (
    <footer className="footer flex">
      &copy; {year} All Rights Reserved  &nbsp; | &nbsp;  <MdCall size={20} />&nbsp;+91 35678900
    </footer>
  );
};

export default Footer;
