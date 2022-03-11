import React from "react";
import { Link } from "react-router-dom";
import BlueBG from "../../assets/bg/bluesquare.svg";

export default function TopCards({ info }) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${info.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="card-wrapper text-white shadow-md flex flex-col justify-center items-center"
      >
        <h2 className="text-white text-4xl font-bold">{info.data}</h2>
        <h5 className="font-semibold mt-10 text-white">{info.title}</h5>
      </div>
    </>
  );
}
