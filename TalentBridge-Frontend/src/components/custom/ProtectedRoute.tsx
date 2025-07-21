import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/features/hooks";
import type { ReactNode } from "react";
interface ProtectedRouteProps {
  requiredPermission: string | string[];
  children: ReactNode;
  to: string;
}

export function ProtectedRoute({
  children,
  requiredPermission,
  to,
}: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  const permissions = Array.isArray(requiredPermission)
    ? requiredPermission
    : [requiredPermission];

  const hasPermission =
    !!user &&
    !!user.permissions &&
    permissions.some((p) => user.permissions.includes(p));

  if (!hasPermission) {
    return <Navigate to={to} replace />;
  }

  return <>{children}</>;
}
