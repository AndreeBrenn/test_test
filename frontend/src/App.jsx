import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        {/*======================================== PUBLIC ROUTE ========================================== */}
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/*======================================== PROTECTED ROUTE ====================================== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/listpage" element={<ListPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
