import AuthPage from "@/pages/client/auth-page";
import HomePage from "@/pages/client/home-page";
import ProtectedRoute from "@/pages/client/ProtectedRoute ";
import RootPage from "@/pages/client";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminPage from "@/pages/admin";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to={"/home"} /> },
      { path: "home", element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <div>a</div> }],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [{ index: true, element: <div>a</div> }],
  },
]);

export default router;
