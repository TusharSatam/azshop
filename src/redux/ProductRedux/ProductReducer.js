import { Fetch_Product } from "./ProductType";

const initialState = {
 product:[],
  };

  
const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case Fetch_Product:
        return {
          ...state,
          product:action.payload
        }
        // case Fetch_RelativeProducts:
        //   return{
        //     ...state,
        //     relativeproduct:action.payload
        //   }
      default:
        return state;
    }
  };
  export default ProductReducer