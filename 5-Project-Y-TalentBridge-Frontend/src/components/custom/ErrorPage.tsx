import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-gray-950">
      <div className="mb-6 rounded-full bg-red-100 p-6 dark:bg-red-900">
        <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-300" />
      </div>
      <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
        Rất tiếc! Đã xảy ra sự cố.
      </h1>
      <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
        Chúng tôi xin lỗi, nhưng trang bạn yêu cầu không thể tìm thấy hoặc đã
        xảy ra một lỗi bất ngờ.
      </p>
    </div>
  );
}
