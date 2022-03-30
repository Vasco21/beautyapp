import React from "react";
import images from "../assests/Aboutus.jpg";
import { Container } from './styles';

const SubHeading = () => (
    <div style={{ marginBottom: '1rem' }}>
      <p className="p__cormorant"></p>
      
    </div>
  );
 const AboutUs: React.FC = () => {
  return (
    <Container>
      <div className="app__header app__wrapper section__padding " id="home">
        <div className="app__wrapper_info ">
          <SubHeading/>
          <h1 className="app__header-h1 gradient__bg">Message from Our Founder</h1>
          <p className="p__opensans" style={{ margin: "2rem 0" }}>
                From one glamorous human to another, I wanted to create a safe space for us to be our charming selves,
                <i> from hairstylists that cater to your hair, makeup artists who know how to make that your face POP!</i>
                <i>and photographers who know how to capture that perfect angle.</i><br/>
          </p>
          <button type="button" className="custom__button">
            More About Us
          </button>
        </div>

        <div className="app__wrapper_img">
          <img src={images} alt="header_img" />
        </div>
      </div>
    </Container>
  );
};
export default AboutUs;