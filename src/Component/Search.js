import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { client } from "../client";
import Product from "./Product";
import sadEmoji from "../assets/SadEmoji.webp";
const Search = () => {
  const SearchProduct = useSelector((state) => state?.searchProduct?.sproduct);
  const [searchProductState, setsearchProductState] = useState();
  const [NotFound, setNotFound] = useState(false)
  useEffect(() => {
    // console.log(SearchProduct);
    if(SearchProduct.length>0){
        const query = `*[_type == "product" && name match '${SearchProduct}*' || category match '${SearchProduct}*' || details match '${SearchProduct}*']`;
        // const query = `*[_type == "product" && name match '${SearchProduct}*' || category match '${SearchProduct}*']`;

        client.fetch(query).then((datas) => {
            if(datas.length){
                setNotFound(false)
                setsearchProductState(datas);
            }
            else{
                setNotFound(true)
            }
          // console.log(datas);
        });
    }
  }, [SearchProduct]);

  return (
    <div className="min-h-[500px]"> 
        {
            NotFound && <div className=" text-red-600 flex flex-col object-fit  align-center text-2xl my-10 w-screen ">
                <img src={sadEmoji} className=" h-[80px] w-[80px] mx-auto object-fit mix-blend-darken"/>
                <h2>Not Found!</h2></div>
        }
        {
            SearchProduct.length==0 && !searchProductState?<div className="text-gray-400 text-3xl h-[400px] flex justify-center align-center"><h1 className="my-auto">Please Fill the Search Input</h1></div>:""
        }
        {
        searchProductState && !NotFound &&
        <Product product={searchProductState}/>
    }
        </div>
  );
};

export default Search;
