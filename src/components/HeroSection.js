import React from "react";
import "../styles/App.css";
import "./HeroSection.css";
import "../styles/Fonts.css";
import Footer from "./Footer";
import vid from "../videos/home.mp4";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src={vid} autoPlay={true} loop muted />
      <h1 className="text-success"> RESOURCES ARE WAITING FOR YOU </h1>
      <h3 className="text-success">
        WHAT IS STOPPING YOU FROM DISCOVERING THEM?
      </h3>
      <div className="hero-btns">
        {/*<Button
          className="btns"
          buttonstyle="btn--outline"
          buttonsize="btn-large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn-large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
       </Button>*/}
        <Footer />
      </div>
    </div>
  );
}

export default HeroSection;
