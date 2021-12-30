import React, { useEffect } from "react";
import "../../styles/App.css";
import HeroSection from "../HeroSection";

function Home() {
  useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
    return () => {};
  }, []);
  return (
    <div className="text-center">
      <HeroSection />
      {/* <Cards /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
