import {
  Building2,
  Wrench,
  Briefcase,
  Settings,
  FileText,
  User,
  ShieldCheck,
  KeyRound,
  UserCog,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    {
      title: "Tổng số công ty",
      value: "156",
      change: "+12%",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Việc làm đang tuyển",
      value: "89",
      change: "+8%",
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "Hồ sơ ứng tuyển",
      value: "1,234",
      change: "+23%",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Người dùng hoạt động",
      value: "567",
      change: "+5%",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  const functionalities = [
    {
      category: "Quản lý Công ty",
      icon: Building2,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      description: "Quản lý thông tin các công ty trong hệ thống",
      features: [
        "Xem danh sách tất cả các công ty",
        "Thêm, sửa, xóa thông tin công ty",
      ],
    },
    {
      category: "Tuyển dụng",
      icon: Wrench,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      description: "Hệ thống quản lý toàn bộ quy trình tuyển dụng",
      features: [
        "Quản lý việc làm: Tạo, chỉnh sửa và theo dõi các tin tuyển dụng",
        "Quản lý kỹ năng: Danh mục các kỹ năng cần thiết cho từng vị trí",
        "Hồ sơ ứng tuyển: Xem và quản lý CV của các ứng viên",
      ],
      subItems: [
        {
          name: "Quản lý việc làm",
          icon: Briefcase,
          description: "Tạo và quản lý các tin tuyển dụng",
        },
        {
          name: "Quản lý kỹ năng",
          icon: Settings,
          description: "Danh mục kỹ năng cho các vị trí công việc",
        },
        {
          name: "Hồ sơ ứng tuyển",
          icon: FileText,
          description: "Quản lý CV và hồ sơ ứng viên",
        },
      ],
    },
    {
      category: "Quản lý Tài khoản",
      icon: User,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      description: "Quản lý người dùng trong hệ thống",
      features: [
        "Xem danh sách tất cả người dùng",
        "Tạo tài khoản mới cho người dùng",
        "Chỉnh sửa thông tin cá nhân",
        "Quản lý trạng thái tài khoản (kích hoạt/vô hiệu hóa)",
      ],
    },
    {
      category: "Phân quyền",
      icon: ShieldCheck,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      description: "Hệ thống phân quyền và bảo mật",
      features: [
        "Quyền hạn: Định nghĩa các quyền truy cập trong hệ thống",
        "Chức vụ: Tạo và quản lý các vai trò người dùng",
        "Gán quyền cho từng chức vụ",
        "Kiểm soát truy cập theo cấp độ",
      ],
      subItems: [
        {
          name: "Quyền hạn",
          icon: KeyRound,
          description: "Quản lý các quyền truy cập hệ thống",
        },
        {
          name: "Chức vụ",
          icon: UserCog,
          description: "Tạo và quản lý vai trò người dùng",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change} so với tháng trước
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Functionalities Overview */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Chức năng hệ thống
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {functionalities.map((func, index) => (
            <Card
              key={index}
              className={`${func.color} transition-all hover:shadow-lg`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg bg-white p-2 ${func.iconColor}`}>
                    <func.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">
                      {func.category}
                    </CardTitle>
                    <CardDescription className="mt-1 text-gray-600">
                      {func.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main features */}
                <div className="space-y-2">
                  {func.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Sub items if available */}
                {func.subItems && (
                  <div className="space-y-2 border-t border-gray-200 pt-2">
                    <h4 className="text-sm font-medium text-gray-800">
                      Chức năng con:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {func.subItems.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center gap-2 rounded-md bg-white/50 p-2"
                        >
                          <subItem.icon className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-800">
                              {subItem.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {subItem.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">
            Hướng dẫn sử dụng
          </CardTitle>
          <CardDescription>
            Các bước cơ bản để bắt đầu sử dụng hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                1
              </div>
              <h4 className="font-medium text-gray-800">Quản lý Công ty</h4>
              <p className="text-xs text-gray-600">
                Thêm và quản lý thông tin các công ty
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                2
              </div>
              <h4 className="font-medium text-gray-800">Tạo việc làm</h4>
              <p className="text-xs text-gray-600">
                Đăng tin tuyển dụng và quản lý kỹ năng
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                3
              </div>
              <h4 className="font-medium text-gray-800">Quản lý User</h4>
              <p className="text-xs text-gray-600">
                Tạo tài khoản và phân quyền người dùng
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                4
              </div>
              <h4 className="font-medium text-gray-800">Theo dõi</h4>
              <p className="text-xs text-gray-600">
                Xem báo cáo và thống kê hệ thống
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
