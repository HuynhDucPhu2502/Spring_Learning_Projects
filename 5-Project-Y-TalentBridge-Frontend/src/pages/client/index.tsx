import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { getAccount } from "@/features/slices/authSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogin) dispatch(getAccount());
  }, [isLogin, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
