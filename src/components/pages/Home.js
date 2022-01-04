import React, { useEffect } from "react";
import "../../styles/App.css";
import HeroSection from "../HeroSection";
/**
 *@description contains all the components of homepage
 */
function Home() {
  localStorage.clear();
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
  return <HeroSection />;
}

export default Home;
