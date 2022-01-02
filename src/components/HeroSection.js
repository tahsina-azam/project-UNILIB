import React, { useEffect } from "react";
import "./HeroSection.css";
import image1 from "../images/img-5.jpg";
import image2 from "../images/img-10.jpg";
import image3 from "../images/img-11.jpg";
import image4 from "../images/img-9.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Services() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".section").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });
    return () => {
      console.log("successful");
    };
  }, []);

  return (
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
                <button class="hero-button">Get Started</button>
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
    </div>
  );
}
