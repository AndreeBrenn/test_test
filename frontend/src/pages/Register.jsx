import React, { useState } from "react";
import axios from "axios";
import { API_USER } from "../utils/Urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    LastName: "",
    FirstName: "",
    MiddleName: "",
    Email: "",
    Username: "",
    Password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.Password == confirmPassword) {
      axios
        .post(API_USER + "register", registerData)
        .then((res) =>
          toast.success("Registered Successfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        )
        .catch((err) =>
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        );
    } else {
      toast.error("Password doesn't match!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="h-130 w-100 flex shadow-md shadow-gray-900 flex-col items-center justify-center"
        onSubmit={handleRegister}
      >
        <span className="font-Roboto text-[35px] mt-17 mb-5">REGISTER</span>
        <div className="flex w-[85%] h-10 flex-col mb-7">
          <span className="font-Roboto">Name:</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            placeholder="Last name"
            onChange={(e) =>
              setRegisterData({ ...registerData, LastName: e.target.value })
            }
          />
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none) mt-2"
            required
            placeholder="First name"
            onChange={(e) =>
              setRegisterData({ ...registerData, FirstName: e.target.value })
            }
          />
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none) mt-2"
            placeholder="Middle name"
            onChange={(e) =>
              setRegisterData({ ...registerData, MiddleName: e.target.value })
            }
          />
        </div>
        <div className="flex w-[85%] h-10 flex-col mt-15 mb-7">
          <span className="font-Roboto">Email</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            type="email"
            onChange={(e) =>
              setRegisterData({ ...registerData, Email: e.target.value })
            }
          />
        </div>
        <div className="flex w-[85%] h-10 flex-col mb-7">
          <span className="font-Roboto">Username</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            onChange={(e) =>
              setRegisterData({ ...registerData, Username: e.target.value })
            }
          />
        </div>
        <div className="flex w-[85%] h-10 flex-col mb-2">
          <span className="font-Roboto">Password</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            type="password"
            onChange={(e) =>
              setRegisterData({ ...registerData, Password: e.target.value })
            }
          />
        </div>
        <div className="flex w-[85%] h-10 flex-col mb-10">
          <span className="font-Roboto">Confirm Password</span>
          <input
            className="w-full h-7 border border-gray-500 focus:(outline-none)"
            required
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-[50%] bg-blue-gray-800 h-8 text-white rounded-full mb-15 transition-all duration-500 hover:(bg-blue-gray-600)"
        >
          Register
        </button>
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

export default Register;
