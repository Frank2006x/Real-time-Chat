import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import { Loader } from "lucide-react";
import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import AppLayout from "./layouts/app-layout";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
function App() {
  const authUser = useAuthStore((state) => state.authUser);
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: authUser ? <HomePage /> : <Navigate to="/login" />,
        },
        {
          path: "/signup",
          element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !authUser ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
        {
          path: "/profile",
          element: authUser ? <ProfilePage /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
