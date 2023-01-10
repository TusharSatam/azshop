import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Add_To_Cart, Decrement_Product_from_Cart, Remove_Product_From_Cart, Update_To_Cart } from "./CartType";

export const AddToCart = (product) => {
  return {
    type: Add_To_Cart,
    payload: product,
  };
};

export const UpdateToCart=(updateProduct)=>{
  return {
    type: Update_To_Cart,
    payload: updateProduct,
  };
}

export const DecrementProductfromCartAction=(updateProduct)=>{
  return {
    type:Decrement_Product_from_Cart,
    payload: updateProduct,
  };
}

export const RemoveProductFromCartAction=(updateProduct)=>{
  return {
    type:Remove_Product_From_Cart,
    payload: updateProduct,
  };
}





export const AddingToCart = (product) => {
  return (dispatch) => {
    let ProductObj=product
    ProductObj.quantity=1
    dispatch(AddToCart(ProductObj));
  };
};

export const UpdatingToCart = (updateProduct) => {
  return (dispatch) => {
    dispatch(UpdateToCart(updateProduct));
  };
};

export const DecrementProductfromCart = (updateProduct) => {
  return (dispatch) => {
    dispatch(DecrementProductfromCartAction(updateProduct));
  };
};


export const RemoveProductFromCart = (RemovedProduct, CalculateSubTotal) => {
  return (dispatch) => {
    // toast.success("Item Removed!")
    dispatch(RemoveProductFromCartAction(RemovedProduct));
    CalculateSubTotal()
  };
};


// export default {AddingToCart,UpdatingToCart};
