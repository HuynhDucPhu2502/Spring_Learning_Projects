// components/ProtectedRoute.tsx
import { useAppSelector } from "@/features/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
