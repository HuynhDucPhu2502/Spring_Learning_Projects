import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import ProtectedRoute from "@/pages/ProtectedRoute ";
import RootPage from "@/pages/RootPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
]);

export default router;
