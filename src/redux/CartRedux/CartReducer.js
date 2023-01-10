import { Add_To_Cart, Decrement_Product_from_Cart, Remove_Product_From_Cart, Update_To_Cart } from "./CartType";

const initialState={
cartProduct:[],
}


const CartReducer = (state = initialState, action) => {
    switch (action.type) {
      case Add_To_Cart:
        return {
          ...state,
          cartProduct:[...state.cartProduct,action.payload]
        }
        case Update_To_Cart:
          return {
            ...state,
            cartProduct:action.payload
          }
          case Decrement_Product_from_Cart:
            return {
              ...state,
              cartProduct:action.payload
            }
            case Remove_Product_From_Cart:
              return {
                ...state,
                cartProduct:action.payload
              }
      default:
        return state;
    }
  };
  export default CartReducer