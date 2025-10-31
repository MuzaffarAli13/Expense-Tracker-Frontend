import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard";
import Income from "./pages/income";
import Expense from "./pages/expense";
import Profile from "./pages/profile";
import { Auth, CheckAuth } from "./routes/Auth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<CheckAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Auth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route index element={<LandingPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default App;
