import React from "react";
import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { MdCall, MdMail } from "react-icons/md";

const About = () => {
  return (
    <div className="about" id="about">
      <Container>
        <h1>About</h1>
        <p className="description muted">
          Our company specializes in creating beautiful and intricate embroidery
          works on a variety of fabrics and materials. Whether you need custom
          designs for clothing, accessories, or home decor, we have the
          expertise and skill to bring your ideas to life. With attention to
          detail and a commitment to quality, our embroiderers use a range of
          techniques to create stunning works of art that are sure to impress.
          Let us help you add a touch of elegance and personalization to your
          next project with our expert embroidery services.
        </p>
        <h4>Contact</h4>
        <p className="pointer">
          <MdMail size={20} />
          &nbsp;&nbsp;example@domain.com
        </p>
        <p>
          <MdCall size={20} />
          &nbsp;&nbsp;+91 35678900
        </p>
        <p>
          <a href="" target="_blank"></a>
        </p>
        <p>
          <b>Address:</b>
          
        </p>
        <br />
        <h4>Our work</h4>
        <WorksMarquee />
      </Container>
    </div>
  );
};

export const WorksMarquee = () => {
  const [images, setImages] = useState([]);
  const storageRef = ref(storage, "works/");
  useEffect(() => {
    listAll(storageRef).then((res) => {
      setImages([]);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImages((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <Marquee pauseOnHover>
      {images.map((url, index) => (
        <Image
          key={index}
          src={url}
          className="works"
          style={{ margin: "0 10px" }}
        />
      ))}
    </Marquee>
  );
};
export default About;
