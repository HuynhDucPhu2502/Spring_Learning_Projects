import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Outlet } from "react-router-dom";

const RootPage = () => {
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
