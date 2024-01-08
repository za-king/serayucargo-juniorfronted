import { Navigate } from "react-router-dom";

type UsePrivateRoute = {
  isAuth: boolean;
  children: any;
};
export const PrivateRoute = ({ isAuth, children }: UsePrivateRoute) => {
  return isAuth ? children : <Navigate to="/" />;
};
