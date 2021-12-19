import React from "react";
import "../../styles/App.css";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Footer from "../Footer";

function Home() {
  return (
    <div>
      <HeroSection />
      <Cards />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
