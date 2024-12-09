import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProctecteRoute = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute = ({ children, role }: TProctecteRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const dispatach = useAppDispatch();
  if (role !== undefined && role != (user as TUser)?.role) {
    dispatach(logout());
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};
export default ProtectedRoute;
