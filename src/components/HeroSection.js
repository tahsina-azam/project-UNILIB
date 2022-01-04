import React from "react";
import "../styles/App.css";
import "./HeroSection.css";
import "../styles/Fonts.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import vid from "../videos/home1.mp4";

function HeroSection() {
  let num = Math.floor(Math.random() * 4 + 1);
  let subtext;
  if (num === 1) subtext = "Get all the books, papers and notes that you need!";
  else if (num === 2)
    subtext = "Borrowing books from the library has never been this easy!";
  else if (num === 3)
    subtext = "Borrowing books from the library has never been this easy!";
  else
    subtext =
      "Discuss with your classmates and teachers about a topic, share notes!";
  return (
    <div className="hero-container text-center text-success">
      <video src={vid} autoPlay={true} loop muted />
      <div className="fnt-unilib pt-5 text-dark">
        {" "}
        <i className="fab fa-typo3 p-3" />
        Unilib
      </div>
      <div className="fnt-welcome text-dark">{subtext}</div>
      <Link className="btn btn-dark fnt-getstart mt-auto mb-3" to="/sign-up">
        Get started
      </Link>
      <div className="mb-5 text-dark" style={{ fontWeight: "500" }}>
        Already registered?{" "}
        <Link className="link text-success" to="/log-in">
          Login here
        </Link>
      </div>
      <div class=" ms-2 row text-center mb-2" style={{ width: "100%" }}>
        <div class="col bdr">Contact with us</div>
        <div class="col bdr">About us</div>
        <div class="col bdr">Terms of Use</div>
      </div>
    </div>
  );
}

export default HeroSection;
