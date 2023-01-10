import { Search_Input } from "./SearchType";
const initialState = {
 sproduct:[],
  };

  
const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
      case Search_Input:
        return {
          ...state,
         sproduct:action.payload
        }
      default:
        return state;
    }
  };
  export default SearchReducer