import React, { useEffect, useState } from "react";
// import { Link, Route, Routes } from "react-router-dom";
import { client, urlFor } from "../client";
import Product from "../Component/Product";
// import ProductDetails from "../Component/ProductDetails";
import { userQuery } from "../utils/data";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
// import {  useDispatch, useSelector } from "react-redux";
// import FetchAllProduct from "../redux/ProductRedux/ProductAction";
import Banner1 from "../assets/Banner1.jpg";
import { Link } from "react-router-dom";
import Spinner from "../Component/Spinner";
const Home = () => {
  //Hooks
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [bannerProduct, setbannerProduct] = useState([]);
  //   const product = useSelector((state) => state?.product?.product);
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  //   const dispatch = useDispatch();
  useEffect(() => {
    const queryUser = userQuery(userInfo?.googleId);
    client.fetch(queryUser).then((data) => {
      setUser(data[0]);
    });
    const queryProduct = '*[_type == "product"]';
    client.fetch(queryProduct).then((data) => {
      setProducts(data);
    });
    const BannerProduct = '*[_type == "banner"]';
    client.fetch(BannerProduct).then((datass) => {
      setbannerProduct(datass);
    });
    // dispatch(FetchAllProduct())
  }, []);
  let x = Math.floor(Math.random() * products.length);



  
  return (
    <div className="h-[100%] w-screen">
      {/* <div className=""> */}
  
      {
        !products &&     <Spinner/>
      }
        <div className="relative  h-[100%] bg-black bannercss">
          <Link to={`/${products[x]?._id}`}>
            <div className="BannerDetails h-[400px] flex justify-center align-center md:flex-row">
              <div className="my-auto mx-4  w-[200px] md:w-[500px]">
                {/* <h3 className="text-white font-bold text-xl">
                {products[0]?.name}
              </h3> */}
                <Fade top>
                  <h1 className="text-white font-bold text-sm md:text-3xl">
                    {products[x]?.name.slice(0, 45)}...
                  </h1>
                </Fade>
                <Fade bottom>
                  <div className=" md:flex md:w-[400px] mt-10">
                    <small className="text-white hidden md:flex flex-col font-bold  md:w-[300px]">
                      <h3 className="text-lg"> Description : </h3>
                      <br />
                      <i>{products[x]?.details}</i>
                    </small>
                    <small className="text-white  font-bold md:hidden md:w-[300px]">
                      Description : <br />
                      <i>{products[x]?.details.slice(0, 100)}...</i>
                    </small>
                  </div>
                </Fade>
              </div>
              {products[x] ? (
                <Zoom bottom>
                  <img
                    src={urlFor(products[x]?.image[0]?.asset)}
                    alt=""
                    className=" h-[140px] w-[140px] md:h-[350px] md:w-[350px] rounded-full my-auto md:mt-3"
                  />
                </Zoom>
              ) : (
                ""
              )}
            </div>
          </Link>
          <div className="absolute bottom-0 right-0 left-0 banner-fadeBottom"></div>
          <div className="mb-22">
            <Product product={products} />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
