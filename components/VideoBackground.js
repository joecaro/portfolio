import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function VideoBackground({}) {
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let video = document.getElementById("video");

    let percentScrolled = window.scrollY / window.innerHeight;

    let currentTime = 0 + Math.round(30 * percentScrolled);

    console.log(currentTime);

    video.currentTime = currentTime / 15;
  };

  return (
    <video
      className={styles.video}
      id='video'
      preload='preload'
      autobuffer='autobuffer'>
      <source
        type='video/webm'
        src='https://res.cloudinary.com/joecarothers/video/upload/v1637734414/misc/0001-0060_bno1fj.webm'></source>
    </video>
  );
}
