import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "./CompanyForm";
import type { Company, CreateAndUpdateRequestDto } from "@/types/company";
import {
  addCompany,
  deleteCompanyById,
  getCompanyList,
  updateCompanyById,
} from "@/services/companyApi";
import Pagination from "@/components/custom/Pagination";
import { CompanyDetailsSidebar } from "./CompanyDetailsSidebar";
import { CompanySearchSection } from "./CompanySearchSection";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { CompanyRow } from "./CompanyRow";

export default function CompanyPage() {
  // Data
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const totalPages = useMemo(
    () => Math.ceil(totalElements / itemsPerPage),
    [totalElements, itemsPerPage]
  );

  // Show Details Form
  const [hoveredCompany, setHoveredCompany] = useState<Company | null>(null);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);

  // Editting Form
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchCompanies = async (
    page: number,
    size: number,
    searchName: string,
    searchAddress: string
  ) => {
    setIsLoading(true);
    try {
      const filters: string[] = [];

      if (searchName) filters.push(`name ~ '*${searchName}*'`);
      if (searchAddress) filters.push(`address ~ '*${searchAddress}*'`);

      const filter = filters.length > 0 ? filters.join(" and ") : null;

      const res = (await getCompanyList({ page, size, filter })).data.data;
      setCompanies(res.content);
      setTotalElements(res.totalElements);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, itemsPerPage, searchName, searchAddress);
  }, [currentPage, itemsPerPage, searchName, searchAddress]);

  const handleAddOrUpdateCompany = async (
    data: CreateAndUpdateRequestDto,
    id?: number
  ) => {
    try {
      if (id && data) {
        await updateCompanyById(data, id);
        toast.success("Cập nhật công ty thành công.");
      } else {
        await addCompany(data);
        toast.success("Thêm công ty thành công.");
      }

      setEditingCompany(null);
      setCurrentPage(1);
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại."));
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      await deleteCompanyById(id);
      toast.success("Xóa công ty thành công.");
      setCurrentPage(1);
      if (hoveredCompany?.id === id) handleCloseSidebar();
    } catch (err) {
      toast.error(getErrorMessage(err, "Xóa công ty thất bại."));
    }
  };

  const handleSearch = () => setCurrentPage(1);

  const handleReset = () => {
    setSearchName("");
    setSearchAddress("");
    setCurrentPage(1);
  };

  const handleCloseSidebar = () => {
    setShowDetailsSidebar(false);
    setHoveredCompany(null);
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setIsFormOpen(true);
    handleCloseSidebar();
  };

  const handleViewDetails = (company: Company) => {
    setHoveredCompany(company);
    setShowDetailsSidebar(true);
  };

  return (
    <div className="space-y-6">
      <CompanySearchSection
        searchName={searchName}
        setSearchName={setSearchName}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách Công Ty</h2>
        <Button
          onClick={() => {
            setEditingCompany(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Mã</TableHead>
              <TableHead>Tên công ty</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Lần cập nhật gần</TableHead>
              <TableHead className="w-24">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              companies.map((company) => (
                <CompanyRow
                  key={company.id}
                  company={company}
                  isActive={hoveredCompany?.id === company.id}
                  isLoading={isLoading}
                  onViewDetails={() => handleViewDetails(company)}
                  onEdit={() => handleEditCompany(company)}
                  onDelete={() => handleDeleteCompany(company.id)}
                />
              ))}

            {!isLoading && companies.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">
                      Không tìm thấy công ty nào
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Thử thay đổi tiêu chí tìm kiếm hoặc thêm công ty mới
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <CompanyForm
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
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
      />
    </div>
  );
}
