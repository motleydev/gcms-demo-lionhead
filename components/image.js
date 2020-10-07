import React from "react";
import useProgressiveImg from "../hooks/useProgressiveImg";

const BlurredUpImage = ({ tiny, large, ...props }) => {
  const [src, { blur }] = useProgressiveImg(tiny, large);

  return (
    <img
      {...props}
      src={src}
      style={{
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 0.3s ease-out",
      }}
    />
  );
};

export default BlurredUpImage;
