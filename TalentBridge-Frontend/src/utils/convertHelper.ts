import { convert } from "html-to-text";

export function formatISO(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatISOToYMD(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getFirstLineFromHtml(html: string): string {
  const plainText = convert(html, {
    wordwrap: false,
    selectors: [{ selector: "a", format: "inline" }],
  });

  return (
    plainText
      .split(/\r?\n/)
      .find((line) => line.trim() !== "")
      ?.trim() ?? ""
  );
}

export const formatSalary = (salary: number) => {
  if (salary === 0) return "Thương lượng";
  return `${salary.toLocaleString()} VND`;
};

export const formatLoginTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  switch (true) {
    case diffMinutes < 1:
      return "Vừa đăng nhập";
    case diffMinutes < 5:
      return "Dưới 5 phút trước";
    case diffMinutes < 15:
      return "Dưới 15 phút trước";
    case diffMinutes < 30:
      return "Dưới 30 phút trước";
    case diffMinutes < 60:
      return `${diffMinutes} phút trước`;
    case diffHours === 1:
      return "1 giờ trước";
    case diffHours < 24:
      return `${diffHours} giờ trước`;
    case diffDays === 1:
      return "1 ngày trước";
    case diffDays < 7:
      return `${diffDays} ngày trước`;
    default:
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
  }
};
