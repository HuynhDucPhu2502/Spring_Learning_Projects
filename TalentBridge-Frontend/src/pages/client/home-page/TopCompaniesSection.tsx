import { EmptyState } from "@/components/custom/EmptyState";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { findAllCompanies } from "@/services/companyApi";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const TopCompaniesSection = () => {
  const [companies, setCompanies] = useState<DefaultCompanyResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const res = (await findAllCompanies({ page: 0, size: 5, filter: null }))
        .data.data;
      setCompanies(res.content);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách công ty."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto mb-10 max-w-7xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Top công ty đang tuyển dụng
        </h2>
        <p className="mt-2 text-gray-600">
          Khám phá những công ty hàng đầu với môi trường làm việc lý tưởng
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {isLoading && (
          <div className="col-span-5 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && companies.length === 0 && (
          <div className="col-span-5 flex items-center justify-center">
            <EmptyState
              title="Không tìm thấy công ty nào"
              description="Có thể đã có lỗi xảy ra"
              icon={<Building2 className="text-muted-foreground h-12 w-12" />}
            />
          </div>
        )}

        {!isLoading &&
          companies.length > 0 &&
          companies.map((company) => (
            <div
              key={company.id}
              className="rounded-xl border p-5 text-center transition hover:shadow-md"
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                className="mx-auto mb-3 h-16 w-16 object-contain"
              />
              <h3 className="mb-1 h-[100px] text-lg font-semibold text-gray-800">
                {company.name}
              </h3>

              <Link
                to={`/companies/${company.id}`}
                className="inline-block text-sm font-medium text-orange-600 hover:underline"
              >
                Xem việc làm
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TopCompaniesSection;
