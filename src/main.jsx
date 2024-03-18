import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./authContext";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import SnackBar from "./components/SnackBar";
import NotFoundPage from "./pages/NotFoundPage";

const Main = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            <Routes>
              {/* Route for AdminLoginPage */}
              <Route path="/" element={<AdminLoginPage />} />

              {/* Route for AdminDashboardPage */}
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

              {/* Route for NotFoundPage */}
              <Route path="/notfound" element={<NotFoundPage />} />
            </Routes>
            <SnackBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
