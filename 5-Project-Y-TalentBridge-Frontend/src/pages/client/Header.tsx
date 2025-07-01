import { Home, Code, Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/features/hooks";
import UserMenu from "@/components/custom/UserMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAppSelector((state) => state.auth);

  const navItems = [
    { href: "/", label: "Trang chủ", Icon: Home },
    { href: "/companies", label: "Công ty", Icon: Building2 },
    { href: "/jobs", label: "Việc làm IT", Icon: Code },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 shadow">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="relative">
          <div className="rounded-2xl border border-white/20 bg-white p-3 shadow">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/web-logo.png"
                alt="TalentBridge"
                className="h-18 w-18 rounded-lg object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-black text-gray-800">
                  TalentBridge
                </h1>
                <p className="text-xs font-medium text-gray-600">
                  Kết nối tài năng
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-2">
            {navItems.map(({ href, label, Icon }) => (
              <li key={label}>
                <Link
                  to={href}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-white hover:bg-white/20"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <div className="rounded-xl border border-white/30 bg-white/10 p-2">
              <UserMenu />
            </div>
          ) : (
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/auth?mode=login"
                className="rounded-full border border-white/50 bg-white px-5 py-2 font-bold text-orange-700 hover:border-white"
              >
                Đăng nhập
              </Link>
            </div>
          )}

          {/* Mobile Nav */}
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
                {isLogin && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <UserMenu />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
