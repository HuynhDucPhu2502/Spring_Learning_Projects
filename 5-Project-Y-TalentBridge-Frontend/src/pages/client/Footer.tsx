import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Main Content */}
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          {/* Logo Section */}
          <div className="mb-6 flex items-center space-x-6 md:mb-0">
            <div className="rounded-2xl border border-white/20 bg-white p-4 shadow">
              <Link to="/" className="block">
                <img
                  src="/web-logo.png"
                  alt="TalentBridge"
                  className="h-18 w-18 rounded-lg object-contain"
                />
              </Link>
            </div>

            <div className="text-center md:text-left">
              <div className="mb-2 flex items-center gap-2">
                <h4 className="text-2xl font-black tracking-wide uppercase">
                  TalentBridge
                </h4>
              </div>
              <p className="text-lg font-medium italic">
                Kết nối tài năng, tạo dựng tương lai
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">
                  Nền tảng tuyển dụng hàng đầu
                </span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex items-center space-x-6">
            <a
              href="https://fb.com/ducphu2003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 hover:bg-orange-100"
            >
              <img
                src="facebook-logo.png"
                alt="Facebook logo"
                className="h-6 w-6"
              />
            </a>

            <div className="text-center md:text-right">
              <p className="text-lg font-bold">Huỳnh Đức Phú</p>
              <div className="mt-1 text-xs text-orange-100">
                Founder & Developer
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-2 text-center text-sm font-medium md:mb-0 md:text-left">
              © 2025 TalentBridge. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-orange-100">
              <span>Hệ thống hoạt động ổn định</span>
              <span>•</span>
              <span>Phiên bản 2.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
