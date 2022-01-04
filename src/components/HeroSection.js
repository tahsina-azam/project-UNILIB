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
<<<<<<< HEAD
    <div class="mainContainer">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Animation Section Website</title>
        <link rel="stylesheet" href="HeroSection.css" />
      </head>
      <body>
        <section class="section five">
          <div class="hero-container">
            <div class="hero-column-left">
              <p class="hero-text">Choose from a wide variety of books.</p>
              <a class="hero-anchor" href="http://localhost:3000/log-in">
                {/*<button class="hero-button">Get Started</button>*/}
              </a>
            </div>
            <div class="hero-column-right">
              <img src={image1} alt="food" class="hero-image" />
            </div>
          </div>
        </section>
        <section class="section one">
          <div class="hero-container">
            <div class="hero-column-left">
              <p class="hero-text">
                Get all the Notes, Pdf's and papers you need.
              </p>
            </div>
            <div class="hero-column-right">
              <img src={image2} alt="food" class="hero-image" />
            </div>
          </div>
        </section>
        <section class="section three">
          <div class="hero-container">
            <div class="hero-column-left">
              <p class="hero-text">
                Discuss with your classmates and teachers about a topic.
              </p>
            </div>
            <div class="hero-column-right">
              <img src={image3} alt="food" class="hero-image" />
            </div>
          </div>
        </section>
        <section class="section four">
          <div class="hero-container">
            <div class="hero-column-left">
              <p class="hero-text">
                Borrowing books from library has never been this easy!
              </p>
            </div>
            <div class="hero-column-right">
              <img src={image4} alt="food" class="hero-image" />
            </div>
          </div>
        </section>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/TextPlugin.min.js"></script>
        <script src="app.js"></script>
      </body>
=======
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
>>>>>>> 180abd2 (fixed #109 #110 #111 #112 #114 #117)
    </div>
  );
}

export default HeroSection;
