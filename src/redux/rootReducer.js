import { combineReducers } from "redux";
import CartReducer from "./CartRedux/CartReducer";
import SearchReducer from "./SearchRedux/SearchReducer";
// import ProductReducer from "./ProductRedux/ProductReducer"
const rootReducer=combineReducers(
    {
        product:CartReducer,
        searchProduct:SearchReducer
       
    }
)

export default rootReducer