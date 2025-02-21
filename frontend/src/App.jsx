import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { authStore } from "./store/authStore";
import { Home, Loader2 } from "lucide-react";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
  const { isCheckingAuth, authUser, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
        />
        <Route
          element={authUser ? <MainLayout /> : <Navigate to={"/signup"} />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
