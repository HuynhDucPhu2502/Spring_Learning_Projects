import { Navigate, useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode");

  if (mode !== "login" && mode !== "register") {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      {mode === "login" && <LoginForm />}
      {mode === "register" && <RegisterForm />}
    </div>
  );
};

export default AuthPage;
