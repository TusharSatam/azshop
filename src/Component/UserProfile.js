import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../client";
import { userQuery } from "../utils/data";

const UserProfile = ({democheck,setdemocheck}) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [userProducts, setuserProducts] = useState();
  const [products, setproducts] = useState();
  useEffect(() => {
    const userProduct = `*[_type == "purchase" && userid == '${userId}'] | order(_createdAt desc)`;
    client.fetch(userProduct).then((datas) => {
      // datas?.map((item) => {
      //   const Product = `*[_type == "product" && name == '${item?.name.slice(0,-3)}.toL']`;
      //   client.fetch(Product).then((data) => {
      //     console.log(data);
      //     // setproducts(data);
      //   });
      // })
      setuserProducts(datas);
    });
  }, []);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  useEffect(() => {
    const queryUser = userQuery(userInfo?.googleId);
    client.fetch(queryUser).then((data) => {
      setUser(data[0]);
    });
  }, []);

const handleLogout=()=>{
  localStorage.clear()
  // window.reload()
  setdemocheck(true)
  navigate('/')
}


  return (
    <div className="min-h-[410px] w-full  flex flex-col justify-center align center">
     {
user &&
      <div className="userInformation ml-3 md:ml-6 flex flex-col justify-left align-left md:w-[90%] md:mx-auto text-left mt-3">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <div>
          <h2>
            UserName : <span>{user?.userName}</span>
          </h2>
          <h2>
            userEmail : <span>{userInfo?.email}</span>
          </h2>
        </div>
        <button className="hover:text-white hover:bg-red-400 w-[120px] rounded-2xl border border-red-200 mx-auto mt-3" onClick={handleLogout}>Logout</button>
      </div>
     }
      <div className="flex flex-col justify-left align-left md:w-[90%] md:mx-auto text-left ">
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <div className="md:w-[95%] mx-auto hidden md:flex bg-red-200 justify-between align-center font-bold">
          <h1 className="w-[20%] ">Date</h1>
          <h1 className="w-[50%] ">Product name</h1>
          <h1 className="w-[15%] ">Price</h1>
          <h1 className="w-[15%] text-center"> Quantity</h1>
        </div>
        {userProducts &&
          userProducts.map((item,i) => (
            <div key={i} className="md:w-[95%] md:mx-auto bg-white flex flex-col md:flex-row justify-between p-3 md:py-3 bg-slate-200 align-center my-2 md:min-h-[50px]">
              <div className="md:w-[20%]">{item.launchAt}</div>
              <h1 className="md:w-[50%] mdp-1 ">
               
                <span className="text-indigo-400">
                  {item.name.slice(0, 45)}...
                </span>{" "}
              </h1>
              <h3 className="md:w-[15%] ">
                 <span>₹{item.price / 100}</span>
              </h3>
              <h3 className="md:w-[15%]  md:text-center">
              <span className="">{item.quantity}</span>
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;
