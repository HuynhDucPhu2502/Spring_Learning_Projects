import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAccount } from "@/features/slices/auth/authThunk";
import Header from "./Header";
import Footer from "./Footer";

const RootPage = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogin) dispatch(getAccount());
  }, [isLogin, dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
