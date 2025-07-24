import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "./CompanyForm";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import {
  saveCompany,
  deleteCompanyById,
  findAllCompanies,
  updateCompanyById,
} from "@/services/companyApi";
import Pagination from "@/components/custom/Pagination";
import { CompanyDetailsSidebar } from "./CompanyDetailsSidebar";
import { CompanySearchSection } from "./CompanySearchSection";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { CompanyTable } from "./CompanyTable";
import HasPermission from "@/pages/commons/HasPermission.tsx";

export default function CompanyManagerPage() {
  // Data
  const [companies, setCompanies] = useState<DefaultCompanyResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Show Details Form
  const [hoveredCompany, setHoveredCompany] =
    useState<DefaultCompanyResponseDto | null>(null);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);

  // Form State
  const [editingCompany, setEditingCompany] =
    useState<DefaultCompanyResponseDto | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ============================
  // HANDLE VIEW DETAILS
  // ============================
  const handleViewDetails = (company: DefaultCompanyResponseDto) => {
    setHoveredCompany(company);
    setShowDetailsSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowDetailsSidebar(false);
    setHoveredCompany(null);
  };

  // ============================
  // HANDLE OPEN FORM
  // ============================
  const openEditForm = (company: DefaultCompanyResponseDto) => {
    setEditingCompany(company);
    setIsFormOpen(true);
    handleCloseSidebar();
  };

  const openCreateForm = () => {
    setEditingCompany(null);
    setIsFormOpen(true);
  };

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchCompanies = async (
    page: number,
    size: number,
    searchName: string,
    searchAddress: string,
  ) => {
    setIsLoading(true);

    try {
      const filters: string[] = [];

      if (searchName) filters.push(`name ~ '*${searchName}*'`);
      if (searchAddress) filters.push(`address ~ '*${searchAddress}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await findAllCompanies({ page, size, filter })).data.data;
      setCompanies(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(1, itemsPerPage, searchName, searchAddress);
    setCurrentPage(1);
  }, [searchName, searchAddress, itemsPerPage]);

  useEffect(() => {
    fetchCompanies(currentPage, itemsPerPage, searchName, searchAddress);
  }, [currentPage, itemsPerPage, searchName, searchAddress]);

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = async () => {
    setSearchName("");
    setSearchAddress("");
    setCurrentPage(1);
    setIsFormOpen(false);
    setEditingCompany(null);

    await fetchCompanies(currentPage, itemsPerPage, searchName, searchAddress);
  };

  // ============================
  // HANDLE CREATE, UPDATE, DELETE
  // ============================
  const handleAddOrUpdateCompany = async (formData: FormData, id?: number) => {
    try {
      setIsLoading(true);
      if (id) {
        await updateCompanyById(formData, id);
        toast.success("Cập nhật công ty thành công.");
      } else {
        await saveCompany(formData);
        toast.success("Thêm công ty thành công.");
      }
      setIsLoading(false);
      handleReset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      setIsLoading(true);
      if (hoveredCompany?.id === id) handleCloseSidebar();
      await deleteCompanyById(id);
      toast.success("Xóa công ty thành công.");

      await handleReset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Xóa công ty thất bại."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <CompanySearchSection
        searchName={searchName}
        setSearchName={setSearchName}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
        onReset={handleReset}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách Công Ty</h2>
        <HasPermission perm={"POST /companies"}>
          <Button
            onClick={openCreateForm}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </HasPermission>
      </div>
      <CompanyTable
        companies={companies}
        isLoading={isLoading}
        hoveredCompany={hoveredCompany}
        onViewDetails={handleViewDetails}
        onEdit={openEditForm}
        onDelete={handleDeleteCompany}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showItemsPerPageSelect={true}
      />
      <CompanyForm
        isLoading={isLoading}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddOrUpdateCompany}
        initialData={editingCompany}
        onCloseForm={() => setEditingCompany(null)}
      />

      <CompanyDetailsSidebar
        company={hoveredCompany}
        isOpen={showDetailsSidebar}
        onClose={handleCloseSidebar}
        onEdit={openEditForm}
        onDelete={handleDeleteCompany}
      />
    </div>
  );
}
