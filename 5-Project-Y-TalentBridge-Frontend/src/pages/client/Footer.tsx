import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-white rounded-lg p-2">
            <Link to={""}>
              <img src="web-logo.png" alt="TalentBridge" className="h-10" />
            </Link>
          </div>
          <div>
            <h4 className="text-lg font-semibold uppercase">TalentBridge</h4>
            <p className="text-sm italic">
              Kết nối tài năng, tạo dựng tương lai
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center space-x-3">
          <a
            href="https://fb.com/ducphu2003"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
          >
            <img
              src="facebook-logo.png"
              alt="Facebook logo"
              className="h-5 w-5"
            />
          </a>
          <div className="text-sm">
            <p>Chịu trách nhiệm:</p>
            <p className="font-medium">Huỳnh Đức Phú</p>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-white/30">
        <p className="text-center text-xs py-4">
          © 2025 TalentBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
