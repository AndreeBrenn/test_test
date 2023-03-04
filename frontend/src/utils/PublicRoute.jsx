import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user == null || user == undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/listpage" />
  );
};

export default PublicRoute;
