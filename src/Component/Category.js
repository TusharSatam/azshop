import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import Product from "./Product";

const Category = () => {
  const [CategoryData, setCategoryData] = useState([]);
  const { categoryId } = useParams();
  // console.log(categoryId);
  useEffect(() => {
    if(categoryId==="All"){
      const CatProduct = `*[_type == "product"]`;
      client.fetch(CatProduct).then((datas) => {
        setCategoryData(datas);
      });
    }

    else{
      const CatProduct = `*[_type == "product" && category == '${categoryId}']`;
      client.fetch(CatProduct).then((datas) => {
        setCategoryData(datas);
      });
    }
  }, [categoryId]);
  return <div>

    <h1 className="my-2 text-indigo-500  text-2xl">Category : <b>{categoryId}</b></h1>
    
    <Product product={CategoryData}/>
    </div>;
};

export default Category;
