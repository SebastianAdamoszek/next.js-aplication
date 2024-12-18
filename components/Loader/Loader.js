import React from "react";
import { RingLoader, CircleLoader, PuffLoader } from "react-spinners";
import Image from "next/image";

import "@/app/globals.css";

export const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "gray",
        border: "20px double #8f7644",
        // aspectRatio: "1/1",
        width: "90%",
        margin: "100px auto",
      }}
    >
      <div style={loaderStyle}>
        <Image
          style={img}
          src="/bilon.png"
          alt="5zł"
          width={120}
          height={120}
        />
        <PuffLoader size={120} color="#8f7644" loading={true} />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

const loaderStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
};
const img = {
  position: "relative",
  top: "122px",
  left: "4px",
  borderRadius: "50%",
  animation: "rotate 2s infinite",
};
