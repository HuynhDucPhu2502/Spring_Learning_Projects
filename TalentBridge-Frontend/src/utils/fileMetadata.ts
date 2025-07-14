export const checkFileSizeAndFileType = (
  file: File,
  size: number,
  type: string,
) => {
  if (file.size > size) return false;
  if (file.type !== type) return false;

  return true;
};
