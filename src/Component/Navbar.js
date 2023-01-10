import React, { useEffect, useRef, useState } from "react";
import SHopLogo from "../assets/ShopLogo.png";
import { BsCart2 } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddingToCart } from "../redux/CartRedux/CartAction";
import SearchingProduct from "../redux/SearchRedux/SearchAction";
import { client } from "../client";
import { userQuery } from "../utils/data";
import profile from "../assets/Profile.png";
const Navbar = ({democheck,setdemocheck}) => {
  const CartProduct = useSelector((state) => state?.product?.cartProduct);
  const SeacrhProduct = useSelector((state) => state?.searchProduct?.sproduct);

  const [CartLength, setCartLength] = useState();
  const [Category, setCategory] = useState("");
  const [user, setuser] = useState();
  const [userImage, setuserImage] = useState("")
const [hasUser, sethasUser] = useState(false)
  // const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultCategory = useRef("");

  const handleCategoryPage = (e) => {
    if (e === "All") {
      setCategory(e);
      navigate(`/Category/All`);
    } else {
      setCategory(e);
      navigate(`/Category/${e}`);
    }
  };

  const handleNavToHomePage = () => {
    defaultCategory.current.value = "All";
    setCategory("All");
    navigate(`/`);
  };

  const handleSearch = (e) => {
    dispatch(SearchingProduct(e));
  };

  useEffect(() => {
    setCartLength(CartProduct?.length);
  }, [CartProduct, AddingToCart]);

  // check user useEffect
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();


  useEffect(() => {
    // if (userInfo) {
      const queryUser = userQuery(userInfo?.googleId);
      client.fetch(queryUser).then((data) => {
        setuser(data[0]);
        setuserImage(data[0]?.image)
      });
    // }
  }, [navigate,setdemocheck]);



  
  
  // console.log(user);



  //user Login Portal

  const hangleLoginportal=()=>{
if(!user){
  navigate('/login')
}
else{
  navigate(`/user-profile/${user?._id}`)
}
  }

  return (
    <div className="flex flex-row justify-between align-center px-2 h-[100px] md:h-[70px] bg-red-200 sticky top-0 z-40">
      {/* //LeftSide */}
      <div
        className="Logo my-1 cursor-pointer flex justify-center align-center"
        onClick={() => handleNavToHomePage()}
      >
        {/* <Link to="/"> */}
        <img
          src={SHopLogo}
          className=" h-[90px] md:h-[65px] md:w-[70px] object-contain rounded-2xl mix-blend-darken"
        />
        {/* </Link> */}
      </div>

      {/* CenterSide */}
      <div className=" hidden md:flex my-auto">
        <Link to="/search">
          <input
            placeholder="Search"
            className="rounded-xl p-2 w-[300px]"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Link>
      </div>

      {/* RightSide */}
      <div className="flex flex-col  md:flex-row justify-center align-center mt-2 md:mt-0">
        <div className="display-flex md:hidden">
          <Link to="/search">
            <input
              placeholder="Search"
              className="rounded-xl p-2 "
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Link>
        </div>

        <div className="NavbarRightSide my-2 flex hover:cursor-pointer flex-row justify-center align-center h-10 bg-indigo-200 rounded-2xl md:my-auto">
          <div className="flex justify-center align-center px-2 ">
            <select
              name="Category"
              id="Category"
              ref={defaultCategory}
              className="rounded-xl text-sm mx-auto pl-2 cursor-pointer"
              onClick={(e) => handleCategoryPage(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Electronics"> Electronics</option>
              <option value="Mobiles">Mobiles</option>
            </select>
          </div>
          {/* <div className="h-10 ToggleSideBar mx-2 my-3 hover:scale-110">
          <BiMenu />
        </div> */}
          <div className="ToggleCart mx-4 ">
            <Link to="/cart">
              {/* <span class="flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            </span> */}
              <span className="absolute  inline-flex justify-center align-center text-white rounded-full h-5 w-3 bg-red-400 z-10">
                {CartLength}
              </span>

              <BsCart2 className="h-10 font-2xl hover:scale-110 relative z-0" />
            </Link>
          </div>
   
          {/* <img src={!democheck?userImage:profile} alt="" className="h-[30px] rounded-full my-auto" onClick={hangleLoginportal}/> */}

          <img src={user?.image?userImage:profile} alt="" className="h-[30px] rounded-full my-auto" onClick={hangleLoginportal}/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
