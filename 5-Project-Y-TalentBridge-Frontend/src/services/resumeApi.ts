import axiosClient from "@/lib/axiosClient";

export const saveResume = (formData: FormData) => {
  return axiosClient.post("/resumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
