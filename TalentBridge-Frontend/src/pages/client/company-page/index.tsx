import { useState, useEffect } from "react";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { findAllCompaniesWithJobsCount } from "@/services/companyApi";
import Pagination from "@/components/custom/Pagination";
import CompanyGrid from "./CompanyGrid";
import { CompanySearchSection } from "./CompanySearchSection";

export default function CompanyClientPage() {
  // Data
  const [companies, setCompanies] = useState<DefaultCompanyResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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

      const res = (await findAllCompaniesWithJobsCount({ page, size, filter }))
        .data.data;
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

    await fetchCompanies(currentPage, itemsPerPage, searchName, searchAddress);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 px-4 py-16">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h1 className="mb-4 text-5xl font-bold text-white">Công ty</h1>
            <p className="mx-auto max-w-2xl text-xl text-orange-100">
              Khám phá các công ty hàng đầu và cơ hội nghề nghiệp
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-orange-200">Công ty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2000+</div>
              <div className="text-sm text-orange-200">Việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10k+</div>
              <div className="text-sm text-orange-200">Ứng viên</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-4/5">
        <div className="my-12">
          <CompanySearchSection
            searchName={searchName}
            setSearchName={setSearchName}
            searchAddress={searchAddress}
            setSearchAddress={setSearchAddress}
            onReset={handleReset}
          />
          <div className="mt-4 text-center text-sm text-gray-500">
            Tìm thấy {companies.length} công ty
          </div>
        </div>

        <CompanyGrid isLoading={isLoading} companies={companies} />

        <div className="my-12">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showItemsPerPageSelect={false}
          />
        </div>
      </div>
    </div>
  );
}
