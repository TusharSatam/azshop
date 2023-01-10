import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../client";
import Fade from "react-reveal/Fade"
const Product = ({ product }) => {
  return (
    <div className="container flex gap-4 flex-col justify-center align-center  m-auto my-1 flex-wrap md:flex-row animate-in ">
      {product && product?.map((item,i) => (
        <Link to={`/${item?._id}`} key={i}>
          <Fade>

         
          <div
            key={item?.name}
            className="flex  bg-slate-100 flex-col w-80 justify-center align-center hover:bg-indigo-100 m-auto p-2 md:p-1 rounded-xl  hover:cursor-pointer border border-indigo-200  hover:ease-in-out duration-500"
            style={{ height: "300px"}}
          >
            <img
              src={urlFor(item?.image[0]?.asset)}
              alt={item?.name}
              className="mix-blend-darken "
              style={{ height: "160px",width:"100%",aspectRatio:"3/2",objectFit:"contain" }}
            />
            <h2 className="text-indigo-600 font-bold ">
              {item?.name?.slice(0, 44)}....
            </h2>
            <p className="text--800">{item?.details?.slice(0,109)}...</p>
          </div>
          </Fade>
        </Link>
      ))}
    </div>
  );
};

export default Product;
