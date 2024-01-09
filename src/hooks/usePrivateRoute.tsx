import { Navigate } from "react-router-dom";
import Contextpage from "../context/Contextpage";
import { useContext, useEffect } from "react";
type UsePrivateRoute = {
  isAuth: string;
  children: any;
};
export const PrivateRoute = ({ children }: UsePrivateRoute) => {
  const { isAuth, getUser }: any = useContext(Contextpage);
  useEffect(() => {
    getUser();
  }, [isAuth]);
  return isAuth != null ? children : <Navigate to="/" />;
};
