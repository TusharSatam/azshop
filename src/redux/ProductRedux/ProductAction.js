import { client } from "../../client";
import { Fetch_Product } from "./ProductType";

const FetchProduct = (data) => {
  return {
    type: Fetch_Product,
    payload: data,
  };
};
// const FetchRelativeProductsAction=(data)=>{
//   return {
//     type: Fetch_RelativeProducts,
//     payload: data,
//   };
// }


const FetchAllProduct = () => {
  return (dispatch) => {
    const queryProduct = '*[_type == "product"]';
    client.fetch(queryProduct).then((data) => {
      dispatch(FetchProduct(data));
    });
  };
};
// const FetchRelativeProducts=(category,id)=>{
//   return (dispatch)=>{
//     const queryProduct = `*[_type == "product" && category == '${category}' && _id != '${id}' ]`;
//     client.fetch(queryProduct).then((data) => {
//       dispatch(FetchRelativeProductsAction(data));
//     }).catch((error)=>console.log(error));
//   };
// };

export default {
  FetchAllProduct,
  // FetchRelativeProducts
}