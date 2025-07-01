import { Briefcase, Send, Bell, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Tìm việc phù hợp",
    description:
      "Khám phá hàng ngàn cơ hội việc làm chất lượng từ các công ty hàng đầu.",
    icon: Briefcase,
  },
  {
    title: "Rải CV dễ dàng",
    description:
      "Nộp CV chỉ với một cú nhấp. Hệ thống giúp bạn tiết kiệm thời gian.",
    icon: Send,
  },
  {
    title: "Nhận thông báo",
    description:
      "Được cập nhật nhanh chóng khi có nhà tuyển dụng xem và phản hồi.",
    icon: Bell,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto mb-12 max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-orange-600">
          Cách thức hoạt động
        </h2>
        <p className="mt-2 text-gray-600">
          Chỉ với 3 bước đơn giản, bạn đã sẵn sàng cho công việc mơ ước
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <div key={index} className="flex items-center">
            {/* Step card */}
            <div className="flex w-64 flex-col items-center rounded-xl border border-orange-200 bg-orange-50 px-6 py-8 text-center transition hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                <Icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-orange-700">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Arrow (except last) */}
            {index < steps.length - 1 && (
              <div className="mx-4 hidden sm:flex">
                <ArrowRight className="h-6 w-6 text-orange-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
