import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import FormatedSubTotal from "./FormatedSubTotal";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import StripeCheckout from "react-stripe-checkout";

import sadCartEmoji from "../assets/sadCartEmoji.jpg";
import { toast, Toaster } from "react-hot-toast";
import getStripe from "../api/getStripe";
import { client } from "../client";
import { userQuery } from "../utils/data";

const Cart = ({ setdemocheck }) => {

  const CartProduct = useSelector((state) => state?.product?.cartProduct);
  const [SubTotalPrice, setSubTotalPrice] = useState(0);
  const [user, setuser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CalculateSubTotal = () => {
    const SubTotal = CartProduct?.reduce(
      (a, c) => (a += c.quantity * c.price),
      0
    );
    setSubTotalPrice(SubTotal);
  };
  useEffect(() => {
    // navigate("/cart");
    CalculateSubTotal();
  }, [CartProduct]);

  //fetch user
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    if (userInfo) {
      const queryUser = userQuery(userInfo?.googleId);
      client.fetch(queryUser).then((data) => {
        setuser(data[0]);
      });
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  // -------------fetch user ending-------------

  // const handleCheckout = async () => {
  //   const stripe = await getStripe();
  //   const response = await fetch("../api/stripe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(CartProduct),
  //   });

  //   if (response.statusCode == 500) return;
  //   const data = await response.json();
  //   console.log(data);
  //   toast.loading("Redirecting...");
  //   stripe.redirectToCheckout({ sessionId: data?.id });
  // };

  //Payment Stripe
  // const makePayment=(token)=>{
  //   const body={
  //     token,
  //     product:SubTotalPrice
  //   }
  //   const headers= {
  //     "Content-Type": "application/json",
  //   }

  //   return fetch(`http://localhost:3232/payment`,{
  //     method:"POST",
  //     headers,
  //     body:JSON.stringify(body)

  //   }).then(response=>{
  //     console.log("RESPONSE",response);
  //     const {status}=response;
  //     console.log("STATUS",status);
  //   })
  //   .catch(error=>console.log(error))
  // }

  // console.log(CartProduct);

  let FilterForBodyCartProduct = CartProduct.map((item) => {
    return {
      product: `${item._id}`,
      name: `${item.name}`,
      price: item.price,
      quantity: `${item.quantity}`,
      // username:`${user?.userName}`,
      userid:`${user?._id}`
    };
  });

  const handleCheckout = async () => {
    if(user){

      toast.warning("Please Wait it my take some time!");
   
    const stripe = await getStripe();
    const response = await fetch(`https://azshopback.onrender.com/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FilterForBodyCartProduct),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    setdemocheck(data);
    // console.log(data);
    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  else{
    navigate("/login")
  }
  };

  // ----------------Payment Section Ended

  return (
    <div className="container overflow-none mx-auto w-screen min-h-[500px]">
      <Toaster />
      <div className=" flex justify-end mr-4">
        {CartProduct.length > 0 && (
          <div className="m-4">
            {/* <StripeCheckout
              stripeKey="pk_test_51JBY5WSFH0H2XJ5NKOwTJxbwFkBEVj3WjQKwMOSQvzv8OueLVnJd2Sc8AFTlIrzc0c3zqZmn2Jz9yjDMmJ4A1XIn00mxlnWRyp"
              token={makePayment}
              name="BUY PRODUCT"
              amount={SubTotalPrice*100}
            > */}

            {/* <form action="/create-checkout-session" method="POST"> */}
            <button
              className="rounded-2xl bg-indigo-600 text-white font-bold p-[10px] text-sm cursor-pointer"
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
            {/* </form> */}

            {/* </StripeCheckout> */}
          </div>
        )}
        <h2 className="my-4">
          SubTotal :{" "}
          <b className="text-indigo-600 text-2xl">
            <FormatedSubTotal price={SubTotalPrice} />
          </b>
        </h2>
      </div>
      {CartProduct.length === 0 ? (
        <div className="text-gray-300  flex justify-center align-center font-bold text-3xl  h-[400px]">
          <img
            src={sadCartEmoji}
            alt=""
            className="animate-bounce h-10 mix-blend-darken rounded-3xl mr-1"
          />
          <h1 className="flex justify-center align-center ">Empty!</h1>
        </div>
      ) : (
        ""
      )}
      {CartProduct?.map((item, i) => (
        <Fade key={i}>
          <CartItem
            item={item}
            index={i}
            className="overflow-none"
            key={item?.name}
            CalculateSubTotal={CalculateSubTotal}
          />
        </Fade>
      ))}
    </div>
  );
};

export default Cart;
