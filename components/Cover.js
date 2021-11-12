import React, { useEffect } from "react";

export default function Cover() {
  useEffect(() => {
    setTimeout(() => {
      let cover = document.getElementById("cover");
      cover.classList.add("cover-inactive");
    }, 500);
  }, []);
  return <div className='cover' id='cover'></div>;
}
