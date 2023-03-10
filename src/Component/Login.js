import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
// import logo from '../assets/logowhite.png';
// import loginpanel from "..assets/loginpanel.webp"
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    // console.log(response);
    localStorage.setItem('user', JSON.stringify(response?.profileObj));
if(response?.profileObj){
  const {  googleId, imageUrl,email,name } = response?.profileObj;
  const doc = {
    _id: googleId,
    _type: 'user',
    userName: name,
    image: imageUrl,
    email:email,
  };
  client.createIfNotExists(doc).then(() => {
    navigate('/', { replace: true });
    // window.reload()
  });
}
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
<img/>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          {/* <div className="p-5">
            <img src={logo} width="130px" />
          </div> */}

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          <h1 className='text-white'> *Please keep your <span className='text-red-400'>third party cookies enabled </span>in browser while Login</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
