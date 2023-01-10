import React, { useEffect } from "react";
import { GrMail } from "react-icons/gr";
import { BsFillBagCheckFill } from "react-icons/bs";


import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Link } from "react-router-dom";
import { client } from "../client";
import { useSelector } from "react-redux";
const Success = () => {
  // const { width, height } = useWindowSize()
  const CartProduct = useSelector((state) => state?.product?.cartProduct);




useEffect(() => {
// console.log(CartProduct);
  // const doc = {
  //   _type: 'purchase',
  //   name:"abc",
  //   total:123,
  //   price:123,
  //   quantity:1,
  // };
  // client.create(doc).then(() => {
  //   // navigate('/');
  //   console.log("kkklklklklk");
  // });

}, [])


  return (
    <div className=" min-h-[300px] md:min-h-[410px] flex flex-col justify-center item-center">
       {/* <Confetti
      width={width}
      height={height}
    /> */}
      <div className=" flex flex-col justify-center align-center">
      
        <BsFillBagCheckFill className="md:text-3xl mx-auto text-green-400" />
          <h1 className=" text-lg md:text-3xl font-bold">
            Thank you.
          </h1>
        <Zoom bottom>
          <h1 className="text-green-400 text-md md:text-2xl font-bold">
            Your order was completed successfully
          </h1>
        </Zoom>
        <Fade top>
          <div className="flex flex-row justify-center align-center mb-2">
            <div className="flex justify-center align-center w-[450px] p-2">
              <GrMail className="md:text-3xl mx-2" />
              <small className="text-[10px]  md:text-[14px] ">
                Am email receipt including the details about your order will be
                sent to the email address provided.Please keep it for your
                records.If you any query,Please email to a2z@gmail.com
              </small>
            </div>
          </div>
          <Link to="/" className="text-white font-bold bg-indigo-400 p-[6px] mt-2 mx-auto  rounded-2xl">Continue Shopping</Link>


        </Fade>
      </div>
    </div>
  );
};

export default Success;
