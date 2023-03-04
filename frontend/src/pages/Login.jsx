import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const { isLoadingUser } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    Username: "",
    Password: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center">
      <form
        className="h-100 w-100 shadow-md shadow-gray-900 flex flex-col items-center justify-start rounded-md"
        onSubmit={handleSubmit}
      >
        <span className="font-Roboto text-[35px] my-8">LOGIN</span>
        <div className="flex w-[85%] h-10 flex-col mb-7">
          <span className="font-Roboto">Username</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            onChange={(e) =>
              setUserData({ ...userData, Username: e.target.value })
            }
          />
        </div>
        <div className="flex w-[85%] h-10 flex-col mb-10">
          <span className="font-Roboto">Password</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, Password: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-[50%] bg-blue-gray-800 h-8 text-white rounded-full mb-15 transition-all duration-500 hover:(bg-blue-gray-600)"
          disabled={isLoadingUser}
        >
          Login
        </button>
        <Link to="/register" className="no-underline">
          <span className="text-[15px] cursor-pointer text-black hover:(underline text-blue-600)">
            Don't have an account?
          </span>
        </Link>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
