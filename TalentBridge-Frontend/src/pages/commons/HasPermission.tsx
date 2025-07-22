import { useAppSelector } from "@/features/hooks.ts";
import React from "react";

interface HasPermissionProps {
  perm: string | string[];
  children: React.ReactNode;
}

const HasPermission = ({ perm, children }: HasPermissionProps) => {
  const { isLogin, user } = useAppSelector((state) => state.auth);

  if (!isLogin || !user || !user.permissions) return null;

  const permissions = Array.isArray(perm) ? perm : [perm];
  const has = permissions.some((p) => user.permissions.includes(p));

  if (!has) return null;

  return <>{children}</>;
};

export default HasPermission;
