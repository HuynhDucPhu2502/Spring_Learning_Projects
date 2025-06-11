import { Search, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 space-x-12">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center md:justify-start">
            <Sparkles className="h-8 w-8 text-orange-500 mr-3" />
            Tìm việc nhanh chóng,
            <br /> Phù hợp với bạn
          </h1>
          <p className="text-lg text-gray-600 text-justify">
            Khám phá hàng ngàn cơ hội IT được cập nhật liên tục, bộ lọc thông
            minh, hỗ trợ 24/7 để bạn không bỏ lỡ bất kỳ vị trí mơ ước nào.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition">
            <Search className="mr-2 h-5 w-5" />
            Tìm việc ngay
          </button>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center h-1/2">
          <img
            src="hero-img.png"
            alt="Hero"
            className="h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
