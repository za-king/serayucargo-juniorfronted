import React from "react";
import { apiUrl, accesToken, apiKey } from "../api/service";
export const useAuthHook = () => {
  const Login = async () => {
    alert("login");
  };
  return { Login };
};
