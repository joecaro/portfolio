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
    let main = document.getElementById("main-container");

    let percentScrolled =
      window.scrollY /
      (main.getBoundingClientRect().height - window.innerHeight);

    let currentTime = 0 + 2 * percentScrolled;

    console.log(currentTime);

    video.currentTime = currentTime;
  };

  return (
    <video
      className={styles.video}
      id='video'
      preload='preload'
      autobuffer='autobuffer'>
      <source
        type='video/webm'
        src='https://res.cloudinary.com/joecarothers/video/upload/v1637766114/misc/AnyConv.com__0001-0060_yrbuff.webm'></source>
    </video>
  );
}
