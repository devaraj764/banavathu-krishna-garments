import React from "react";
import {  Image } from "react-bootstrap";

const Banner = () => {
  return (
    <div className="banner" id="home">
      <h1>
        Experience Timeless Luxury, <br /> Redesigned for women
      </h1>
      <p className="muted description">
        Whether you need custom designs for clothing, accessories, or home
        decor, we have the expertise and skill to bring your ideas to life. With
        attention to detail and a commitment to quality.
      </p>
      <Image src="/assets/banner-bg.png" fluid style={{padding: '10px'}}/>
    </div>
  );
};

export default Banner;
