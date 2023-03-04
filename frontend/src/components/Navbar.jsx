import React from "react";

const Navbar = () => {
  return (
    <div className="fixed h-20 w-full bg-gray-900 flex items-center p-4 justify-between">
      <span className="text-white font-Roboto text-[25px]">INVOICE TEST</span>
      <span className="text-white text-[18px] cursor-pointer rounded-md p-1 hover:(bg-gray-600)">
        Logout
      </span>
    </div>
  );
};

export default Navbar;
