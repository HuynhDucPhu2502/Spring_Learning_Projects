"use client";

import { Home, Code, Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { logout } from "@/features/slices/auth/authThunk";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { isLogin, user } = useAppSelector((state) => state.auth);

  const navItems = [
    { href: "/", label: "Trang chủ", Icon: Home },
    { href: "/jobs", label: "Việc làm IT", Icon: Code },
    { href: "/companies", label: "Tổng công ty", Icon: Building2 },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 backdrop-blur-sm">
        {/* Logo */}
        <div className="bg-white p-2 rounded-lg">
          <Link to="/" className="flex items-center">
            <img src="web-logo.png" alt="TalentBridge" className="h-12" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-8">
            {navItems.map(({ href, label, Icon }) => (
              <li key={label}>
                <Link
                  to={href}
                  className="flex items-center px-3 py-2 rounded-md text-white font-medium hover:bg-white/25 transition"
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth */}
        {isLogin ? (
          <div className="hidden lg:flex items-center space-x-4 text-white">
            <span>Xin chào, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border-2 border-white hover:bg-white hover:text-orange-600 transition"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link
            to="/auth?mode=login"
            className="hidden lg:inline-block px-4 py-2 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-orange-600 transition"
          >
            Đăng nhập
          </Link>
        )}

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/25"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  to={href}
                  onClick={handleNavClick}
                  className="flex items-center px-4 py-3 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {label}
                </Link>
              ))}

              <div className="pt-4 border-t">
                {isLogin ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-gray-500 px-4">
                      Xin chào, {user.name}
                    </span>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600"
                    >
                      Đăng xuất
                    </Button>
                  </div>
                ) : (
                  <Link
                    to="/auth?mode=login"
                    onClick={handleNavClick}
                    className="flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium hover:from-orange-500 hover:to-orange-600 transition"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
