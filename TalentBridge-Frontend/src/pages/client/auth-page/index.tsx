import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAppSelector } from "@/features/hooks";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();

  // =====================================
  // Check mode
  // ======================================
  const [params] = useSearchParams();
  const mode = params.get("mode");
  useEffect(() => {
    if (mode !== "login" && mode !== "register") {
      navigate("/auth?mode=login");
    }
  }, [mode, navigate]);

  // =====================================
  // Check login
  // ======================================
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (isLogin) {
      navigate("/home", { replace: true });
    }
  }, [isLogin, navigate]);

  return (
    <div>
      {mode === "login" && <LoginForm />}
      {mode === "register" && <RegisterForm />}
    </div>
  );
};

export default AuthPage;
