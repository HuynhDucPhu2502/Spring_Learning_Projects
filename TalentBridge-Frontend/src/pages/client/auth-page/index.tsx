import { useAppSelector } from "@/features/hooks";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode");

  const loginRef = useRef<HTMLDivElement | null>(null);
  const registerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mode !== "login" && mode !== "register") {
      navigate("/auth?mode=login");
    }
  }, [mode, navigate]);

  const isLogin = useAppSelector((state) => state.auth.isLogin);
  useEffect(() => {
    if (isLogin) {
      navigate("/home", { replace: true });
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (mode === "login" && loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (mode === "register" && registerRef.current) {
      registerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mode]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-12">
      {mode === "login" && (
        <div ref={loginRef}>
          <LoginForm />
        </div>
      )}
      {mode === "register" && (
        <div ref={registerRef}>
          <RegisterForm />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
