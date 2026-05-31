import { useAuth } from "@/app/providers/AuthProvider";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
