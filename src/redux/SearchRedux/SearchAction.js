import { Search_Input } from "./SearchType";

export const SearchInput = (data) => {
  return {
    type: Search_Input,
    payload: data,
  };
};


const SearchingProduct=(e)=>{
return (dispatch)=>{
dispatch(SearchInput(e))
}
}

export default SearchingProduct