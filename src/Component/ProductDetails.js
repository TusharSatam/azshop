import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { client, urlFor } from "../client";
import { AddingToCart, UpdatingToCart } from "../redux/CartRedux/CartAction";
import toast, { Toaster } from "react-hot-toast";
// import { Fetch_RelativeProducts } from "../redux/ProductRedux/ProductType";
import Product from "./Product";
import Spinner from "./Spinner";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [relatedProducts, setrelatedProducts] = useState();
  const CartProduct = useSelector((state) => state?.product?.cartProduct);
  const [MultipleImage, setMultipleImage] = useState([]);
  const [NumOfItemInCart, setNumOfItemInCart] = useState("");
// console.log(NumOfItemInCart);
  // const relativeProduct = useSelector((state) => state?.product?.relativeproduct);

  useEffect(() => {
    window.scrollTo(0, 0);
    const queryProduct = `*[_type == "product" && _id=='${productId}']`;
    client.fetch(queryProduct).then((data) => {
      const relatedProduct = `*[_type == "product" && category == '${data[0]?.category}' && _id != '${productId}' ]`;
      client.fetch(relatedProduct).then((datas) => {
        setrelatedProducts(datas);
        // console.log(datas);
      });
      setMultipleImage(data[0].image[0]);
      setProduct(data[0]);
      // console.log(data[0]);
      // console.log("scroll Top");
    });
    // dispatch(Fetch_RelativeProducts(product?.category,productId));
  }, [productId]);

  // useEffect(() => {
  //   const relatedProduct = `*[_type == "product" && category == '${product?.category}' && _id != '${productId}' ]`;
  //   client.fetch(relatedProduct).then((data) => {
  //     setrelatedProducts(data);
  //     console.log(data);
  //   });
  // }, [product?.length])

  // custom Function

  const AddingProductToCart = (product) => {
    let isExistProduct = CartProduct.find((item) => item._id === product._id);
    let IndexOFisExistProduct = CartProduct.findIndex(
      (item) => item._id === product._id
    );
    if (isExistProduct) {
      CartProduct[IndexOFisExistProduct].quantity += 1;
      dispatch(UpdatingToCart(CartProduct));
      setNumOfItemInCart(CartProduct[IndexOFisExistProduct]?.quantity);
      toast.success("Item quantity has increased");
    } else {
      dispatch(AddingToCart(product));
      setNumOfItemInCart(CartProduct[IndexOFisExistProduct]?.quantity);
      // console.log(product);
      toast.success("Item has been added to cart");
    }
  };

//Buy Now

const BuyProduct=()=>{
  let isExistProduct = CartProduct.find((item) => item._id === product._id);
  let IndexOFisExistProduct = CartProduct.findIndex(
    (item) => item._id === product._id
  );
  if (isExistProduct) {
    CartProduct[IndexOFisExistProduct].quantity += 1;
    dispatch(UpdatingToCart(CartProduct));
    setNumOfItemInCart(CartProduct[IndexOFisExistProduct]?.quantity);
    navigate('/cart')
    toast.success("Item quantity has increased");
  } else {
    dispatch(AddingToCart(product));
    setNumOfItemInCart(CartProduct[IndexOFisExistProduct]?.quantity);
    navigate('/cart')

    // console.log(product);
  }
}


// ----------------BuyProduct End---------------------  
  let IndexItem=CartProduct?.findIndex((item)=>item._id===productId)

  // useEffect(() => {

    // setNumOfItemInCart(CartProduct[IndexItem]?.quantity)
  // }, [CartProduct])

  return (
    <div className="flex flex-col h-full w-screen overflow-x-hidden mb-6">
           {
        !product &&     <Spinner/>
      }
      <div className="container mx-auto my-4 flex flex-col justify-center align-center md:border border-red-100 md:flex-row md:h-3/6 bg-slate-100 rounded-2xl">
        <div className="w-full overflow-none h-2/5 mt-2 flex justify-center align-center md:py-4 md:w-3/6 md:h-full hover:animate-pulse md:3/6 ">
          {product && (
            <img
              src={urlFor(MultipleImage)}
              alt={product?.name}
              className="h-[250px] object-contain md:h-[300px] mix-blend-darken hover:rounded-2xl"
            />
          )}
          <div className="h-10 w-10 ">
            {product?.image.map((item,i) => (
              <img
                src={urlFor(item?.asset?._ref)}
                onClick={() => setMultipleImage(item?.asset?._ref)}
                className="my-2"
                key={i}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-4/6 overflow-none flex px-3 flex-col justify-center align-center md:p-3  md:w-3/6 md:h-[350px]">
          <h2 className="text-indigo-600 font-bold">{product?.name}</h2>
          <p>
            <i>{product?.details}</i>
          </p>
          <div className="my-4 flex flex-col md:flex-row ">
            <div className="productAmount flex justify-items-start mx-auto ">
              <small>Rs</small>{" "}
              <h3 className=" mx-2 font-bold text-indigo-700 hover:scale-125 text-2xl ">
                {product?.price}
              </h3>
            </div>
            <button
              className=" mx-auto my-4 border border-indigo-400 w-40 p-1 rounded-xl hover:bg-indigo-300 hover:text-white"
              onClick={() => AddingProductToCart(product)}
            >
              Add To Cart {(CartProduct[IndexItem]?.quantity>0)?`(${CartProduct[IndexItem]?.quantity})`:""}
            </button>
            <button
              className=" mx-auto border my-4 border-indigo-400 w-40 p-1 rounded-xl hover:bg-indigo-300 hover:text-white"
              onClick={() => BuyProduct(product)}
            >
              Buy Now 
            </button>
            <Toaster />
          </div>
        </div>
      </div>
      {relatedProducts?.length ? (
        <h2 className="flex flex-col my-3  text-lg font-bold ">
         Related to items you've viewed
          <b> 👇 </b>
        </h2>
      ) : (
        ""
      )}

      {relatedProducts && <Product product={relatedProducts} />}
    </div>
  );
};

export default ProductDetails;
