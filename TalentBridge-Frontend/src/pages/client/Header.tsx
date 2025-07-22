// src/components/layout/Header.tsx

import { Home, Code, Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "@/features/hooks";
import UserMenu from "@/pages/commons/UserMenu.tsx";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAppSelector((state) => state.auth);

  const navItems = [
    { href: "/home", label: "Trang chủ", Icon: Home },
    { href: "/companies", label: "Công ty", Icon: Building2 },
    { href: "/jobs", label: "Việc làm IT", Icon: Code },
  ];

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white px-4 shadow"
        >
          <img
            src="/web-logo.png"
            alt="TalentBridge"
            className="size-12 rounded-lg object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-2">
            {navItems.map(({ href, label, Icon }) => (
              <li key={label}>
                <NavLink
                  to={href}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-4 py-2 font-medium duration-300 ease-in-out hover:-translate-y-0.5 ${
                      isActive
                        ? "bg-amber-400 text-white"
                        : "bg-white text-orange-500"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth + Mobile Nav */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <UserMenu />
          ) : (
            <Link
              to="/auth?mode=login"
              className="hidden rounded-full border border-white/50 bg-white px-5 py-2 font-bold text-orange-700 hover:border-white lg:flex"
            >
              Đăng nhập
            </Link>
          )}

          {/* Mobile Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg border border-white/20 p-2 text-white lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] bg-white sm:w-[400px]"
            >
              <div className="mt-8 flex flex-col space-y-3">
                {navItems.map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    to={href}
                    onClick={handleNavClick}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-gray-700 hover:bg-orange-50"
                  >
                    <Icon className="h-5 w-5 text-orange-600" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
