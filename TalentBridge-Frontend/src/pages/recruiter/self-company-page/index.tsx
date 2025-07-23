import LoadingSpinner from "@/components/custom/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { CompanyForm } from "@/pages/admin/company-page/CompanyForm";
import CompanySection from "@/pages/commons/company-details-components/CompanySection";
import { findSelfCompany, updateSelfCompany } from "@/services/companyApi";
import type { DefaultCompanyResponseDto } from "@/types/company";
import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CompanyManagerRecruiterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [company, setCompany] = useState<
    DefaultCompanyResponseDto | undefined
  >();

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchCompany = async () => {
    setIsLoading(true);
    try {
      const res = (await findSelfCompany()).data.data;
      setCompany(res);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy thông tin công ty"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  // ============================
  // HANDLE UPDATE SELF COMPANY
  // ============================
  const handleUpdateSelfCompany = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await updateSelfCompany(formData);
      fetchCompany();
      toast.success("Cập nhật công ty thành công.");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại."));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!company) return null;

  return (
    <>
      <Button
        onClick={() => setIsFormOpen(true)}
        className="bg-purple-600 hover:bg-purple-700"
      >
        <NotebookPen className="mr-2 h-4 w-4" />
        Chỉnh sửa thông tin công ty
      </Button>

      <CompanySection company={company} jobsCount={0} isRecruiter={true} />

      <CompanyForm
        isLoading={isLoading}
        initialData={company}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleUpdateSelfCompany}
      />
    </>
  );
};

export default CompanyManagerRecruiterPage;
