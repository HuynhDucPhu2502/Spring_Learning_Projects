import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Search, Building2, X } from "lucide-react";
import { toast } from "sonner";
import type { CompanySummary } from "@/types/job";
import { findAllCompanies } from "@/services/companyApi.ts";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import Pagination from "@/components/custom/Pagination.tsx";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import { EmptyState } from "@/components/custom/EmptyState.tsx";
import LoadingSpinner from "@/components/custom/LoadingSpinner.tsx";
import { DialogDescription } from "@radix-ui/react-dialog";

interface CompanySelectionProps {
  selectedCompany: CompanySummary | undefined;
  addCompany: (company: CompanySummary) => void;
  removeCompany: () => void;
}

const CompanySelection = ({
  selectedCompany,
  addCompany,
  removeCompany,
}: CompanySelectionProps) => {
  // ============================
  // Modal State
  // ============================
  const [showDialog, setShowDialog] = useState(false);
  const closeModal = () => setShowDialog(false);

  // ============================
  // Pagination State
  // ============================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // ============================
  // Fetching State
  // ============================
  const [searchName, setsearchName] = useState("");
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = async (
    page: number,
    size: number,
    searchName: string,
  ) => {
    setIsLoading(true);
    try {
      const filter = searchName ? `name ~ '*${searchName}*'` : null;

      const res = await findAllCompanies({ page, size, filter });
      const data = res.data.data;

      const mapped: CompanySummary[] = data.content.map(
        (company: DefaultCompanyResponseDto) => ({
          id: company.id,
          name: company.name,
          address: company.address,
          logoUrl: company.logoUrl,
        }),
      );

      setCompanies(mapped);
      setTotalElements(data.totalElements);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, itemsPerPage, searchName);
  }, [currentPage, itemsPerPage, searchName]);

  // ============================
  // Handle Add Company
  // ============================
  const onAddCompany = (company: CompanySummary) => {
    addCompany(company);
    closeModal();
  };

  return (
    <div className="space-y-2">
      <Label>
        Công ty <span className="text-red-500">*</span>
      </Label>

      <div className="rounded-md border bg-gray-50/50 p-3">
        {selectedCompany && (
          <div className="mb-3 flex min-h-[100px] items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3">
              {selectedCompany.logoUrl ? (
                <img
                  src={selectedCompany.logoUrl}
                  alt={`${selectedCompany.name} logo`}
                  className="h-16 w-16 rounded-lg border object-contain"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100">
                  <Building2 className="h-10 w-10 text-blue-600" />
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-900">
                  {selectedCompany.name}
                </span>
                <p className="text-xs text-gray-500">
                  {selectedCompany.address}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 hover:bg-red-50 hover:text-red-600"
              onClick={removeCompany}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!selectedCompany && (
          <div className="mb-3 flex min-h-[100px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <div>
              <Building2 className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">Chưa chọn công ty</p>
            </div>
          </div>
        )}

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-dashed"
            >
              <Building2 className="mr-2 h-4 w-4" />
              {selectedCompany ? "Đổi công ty" : "Chọn công ty"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Chọn công ty
              </DialogTitle>
              <DialogDescription>company selection panel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Tìm kiếm công ty..."
                  value={searchName}
                  onChange={(e) => setsearchName(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
                {isLoading && (
                  <div className="flex justify-center py-6">
                    <LoadingSpinner />
                  </div>
                )}

                {companies.length === 0 && !isLoading && (
                  <div className="py-8 text-center">
                    <EmptyState
                      title="Không tìm thấy công ty nào"
                      description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm công ty mới"
                      icon={
                        <Building2 className="text-muted-foreground h-12 w-12" />
                      }
                    />
                  </div>
                )}

                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="group cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md"
                    onClick={() => onAddCompany(company)}
                  >
                    <div className="flex items-center gap-3">
                      {company.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={`${company.name} logo`}
                          className="h-10 w-10 rounded-lg border object-contain"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold break-all whitespace-normal">
                          {company.name}
                        </h4>
                        <p className="break-all whitespace-normal">
                          {company.address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!isLoading && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  showItemsPerPageSelect={false}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CompanySelection;
