import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../client";
import { AddingToCart, DecrementProductfromCart, RemoveProductFromCart, UpdatingToCart } from "../redux/CartRedux/CartAction";
import FormatedPrice from "./FormatedPrice";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";
import {RiDeleteBin6Line} from  "react-icons/ri";

const CartItem = ({ item, index,CalculateSubTotal }) => {
  const CartProduct = useSelector((state) => state?.product?.cartProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddingProductToCart = (product) => {
    let isExistProduct = CartProduct.find((item) => item._id === product._id);
    let IndexOFisExistProduct = CartProduct.findIndex(
      (item) => item._id === product._id
    );
    if (isExistProduct) {
      CartProduct[IndexOFisExistProduct].quantity += 1;
      // console.log(CartProduct);
      dispatch(UpdatingToCart(CartProduct));
      CalculateSubTotal()
      navigate("/cart");
    } else {
      dispatch(AddingToCart(product));

    }
  };

  const DecrementingProductfromCart=(product)=>{
    let isExistProduct = CartProduct.find((item) => item._id === product._id);
    let filterProduct=CartProduct.filter((item)=>item._id!==product._id);
    let IndexOFisExistProduct = CartProduct.findIndex(
      (item) => item._id === product._id
    );
    if (isExistProduct) {
        if(CartProduct[IndexOFisExistProduct].quantity>1){
            CartProduct[IndexOFisExistProduct].quantity -= 1;
            dispatch(DecrementProductfromCart(CartProduct));
            CalculateSubTotal()
            navigate("/cart");
        }
        else if(CartProduct[IndexOFisExistProduct].quantity==1){
          dispatch(RemoveProductFromCart(filterProduct,CalculateSubTotal))
          toast.success("Item removed from cart")
            CalculateSubTotal()
            navigate("/cart");
        }
    }

  }

const DeleteProductFromCart=(product)=>{
  let isExistProduct = CartProduct.find((item) => item._id === product._id);
  let filterProduct=CartProduct.filter((item)=>item._id!==product._id);
  dispatch(RemoveProductFromCart(filterProduct,CalculateSubTotal))
  CalculateSubTotal()
  navigate("/cart");
  toast.success("Item Removed!")
}

//   useEffect(() => {
  
//   }, [dispatch]);

  return (
    <div className="Item  flex flex-col mx-2 my-4  border border-indigo-200 rounded-2xl rounded-xl justify-center align-center hover:bg-indigo-100 hover:cursor-pointer">
      {/* <Toaster/> */}
      <div className="flex flex-row">
      {/* LeftSide */}
      <div className="CartItemLeft flex w-1/6 p-2  md:w-[100px]">
        <div className="ItemImage flex  object-fit mx-1 align-center justify-center rounded-2xl md:h-14">
          <img
            src={urlFor(item?.image[0]?.asset)}
            className="mix-blend-darken object-contain"
          />
        </div>
      </div>
      {/* MiddleSide */}
      <div className="CartItemCenter flex align-center justify-center m-2 w-2/6 text-sm">
        {item?.name.slice(0, 25)}...
      </div>
      {/* RightSide */}
      <div className="CartItemRight flex w-3/6  md:justify-between">
        <div className="IncDecButtons flex m-2 bg-red-200 justify-center items-center w-[56px]  md:w-[90px] rounded-2xl ">
          <small className="Inc  md:mx-2 cursor-pointer text-xl md:text-2xl"
            onClick={() => DecrementingProductfromCart(item)}
          
          >
            -
          </small>
          <h3 className="QuantityNum mx-1 md:mx-2 ">
            {CartProduct[index].quantity}
          </h3>
          <small
            className="Dec  md:mx-2 cursor-pointer  text-xl md:text-2xl"
            onClick={() => AddingProductToCart(item)}
          >
            +
          </small>
        </div>
        <div className="ItemAmount   md:mx-2">
          
          <i className=" text-sm md:text-2xl">
            <FormatedPrice price={item?.price} quantity={item?.quantity} />
          </i>
        </div>
      </div>
      </div>
      <div  className="text-red-800 flex justify-center align-center w-[30%] md:w-[10%]  mx-auto rounded-2xl h-6 hover:bg-red-600 hover:text-white mt-2"> 
      <h2 className="flex my-auto " onClick={()=>DeleteProductFromCart(item)}><RiDeleteBin6Line className="mt-1"/>Delete</h2>
      </div>
    </div>
  );
};

export default CartItem;
