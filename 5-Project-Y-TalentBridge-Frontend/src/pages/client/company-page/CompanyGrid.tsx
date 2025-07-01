import type { Company } from "@/types/company";
import { Building2, ChevronRight, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getFirstLineFromHtml } from "@/utils/convertHelper";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import { EmptyState } from "@/components/custom/EmptyState";
import { useNavigate } from "react-router-dom";

type CompanyGridProps = {
  isLoading: boolean;
  companies: Company[];
};

const CompanyGrid = ({ isLoading, companies }: CompanyGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {isLoading && (
        <div className="col-span-3 flex min-h-[300px] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && companies.length === 0 && (
        <div className="col-span-3 flex min-h-[300px] items-center justify-center">
          <EmptyState
            title="Không tìm thấy công ty nào"
            description="Thử thay đổi tiêu chí tìm kiếm hoặc thêm công ty mới"
            icon={<Building2 className="text-muted-foreground h-12 w-12" />}
          />
        </div>
      )}

      {companies.map((company) => (
        <Card
          key={company.id}
          className="cursor-pointer bg-white transition-shadow duration-200 hover:shadow-lg"
          onClick={() => navigate(`/companies/${company.id}`)}
        >
          <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex flex-1 items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                  {company.name}
                </h3>
              </div>
              <div className="ml-2 flex flex-shrink-0 items-center gap-1">
                <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-medium text-gray-900">4.8</span>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm text-gray-600">
              {getFirstLineFromHtml(company.description) || company.name}
            </p>

            {/* Footer with location, jobs, reviews */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{company.address}</span>
              </div>
              <div className="flex flex-shrink-0 items-center gap-4">
                <span className="font-medium text-orange-600">
                  {company.jobsCount || 0} việc làm
                </span>
                <div className="flex items-center gap-1 text-blue-600">
                  <span className="font-medium">123 đánh giá</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompanyGrid;
