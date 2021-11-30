import React from "react";
import "../styles/App.css";
import { Button } from "react-bootstrap";
import "./HeroSection.css";
import vid from "../videos/video-3.mp4";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src={vid} autoPlay={true} loop muted />
      <h1> RESOURCES ARE WAITING FOR YOU </h1>
      <h3 style={{ color: "white" }}>
        WHAT IS STOPPING YOU FROM DISCOVERING THEM?
      </h3>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn-large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn-large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
