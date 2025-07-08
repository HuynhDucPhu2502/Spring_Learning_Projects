export const statusOptions = [
  { value: "PENDING", label: "Chờ duyệt", color: "bg-gray-200 text-gray-700" },
  {
    value: "REVIEWING",
    label: "Đang xét duyệt",
    color: "bg-blue-100 text-blue-700",
  },
  {
    value: "APPROVED",
    label: "Đã duyệt",
    color: "bg-green-100 text-green-700",
  },
  { value: "REJECTED", label: "Từ chối", color: "bg-red-100 text-red-700" },
];

export const getResumeStatusColor = (status: string) => {
  const statusItem = statusOptions.find((opt) => opt.value === status);
  return statusItem ? statusItem.color : "bg-gray-200 text-gray-700";
};
