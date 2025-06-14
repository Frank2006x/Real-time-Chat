import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthStore } from "../store/useAuthStore";
import React from "react";

const AppLayout = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
