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

  const firstLine =
    plainText
      .split(/\r?\n/)
      .find((line) => line.trim() !== "")
      ?.trim() ?? "";

  return firstLine;
}

export const formatSalary = (salary: number) => {
  if (salary === 0) return "Thương lượng";
  return `${salary.toLocaleString()} VND`;
};
