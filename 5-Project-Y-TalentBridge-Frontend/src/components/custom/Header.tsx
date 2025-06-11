import { Home, Code, Building2 } from "lucide-react";

const Header = () => {
  const navItems = [
    { href: "/", label: "Trang chủ", Icon: Home },
    { href: "/jobs", label: "Việc làm IT", Icon: Code },
    { href: "/companies", label: "Tổng công ty", Icon: Building2 },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 backdrop-blur-sm">
        {/* Logo */}
        <div className="bg-white p-2 rounded-lg">
          <a href="/" className="flex items-center">
            <img src="web-logo.png" alt="TalentBridge" className="h-12" />
          </a>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center space-x-8">
            {navItems.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center px-3 py-2 rounded-md text-white font-medium hover:bg-white/25 transition"
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Đăng nhập as link */}
        <a
          href="/login"
          className="inline-block px-4 py-2 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-orange-600 transition"
        >
          Đăng nhập
        </a>
      </div>
    </header>
  );
};

export default Header;
