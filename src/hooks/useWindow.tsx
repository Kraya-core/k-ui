import React, { useEffect, useState } from "react";

function useWindow() {
  const [innerWindowWidth, setInnerWidth] = useState(768);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setInnerWidth(window.innerWidth);
    });
    return window.removeEventListener("resize", (e) => {});
  }, []);

  return { innerWindowWidth };
}

export default useWindow;
