import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import { Building2, MapPin, CalendarDays } from "lucide-react";
import RichTextPreview from "@/components/custom/RichText/index-preview.tsx";
import { formatISO } from "@/utils/convertHelper.ts";

type CompanySectionProps = {
  company: DefaultCompanyResponseDto;
  jobsCount: number;
  isRecruiter?: boolean;
};

const CompanySection = ({
  company,
  jobsCount,
  isRecruiter = false,
}: CompanySectionProps) => {
  return (
    <>
      <div
        className={`space-y-6 overflow-y-auto pr-2 ${jobsCount > 0 ? "md:col-span-2" : "md:col-span-3"}`}
      >
        <div className="flex h-[200px] items-center gap-4">
          {company.logoUrl ? (
            <div className="rounded-full border-4 border-gray-300 p-4">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-20 w-20 object-contain"
              />
            </div>
          ) : (
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full border ${isRecruiter ? "text-purple-600" : "text-orange-600"}`}
            >
              <Building2 className="h-8 w-8" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-black">{company.name}</h1>
            <p className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-1 h-4 w-4" />
              {company.address}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Mô tả</h3>
          <RichTextPreview content={company.description} />
        </div>

        <div className="space-y-2 rounded-2xl border bg-white p-4 text-sm text-gray-600 shadow">
          <p className="flex items-center">
            <CalendarDays className="mr-1 h-4 w-4" />
            Ngày tạo: {formatISO(company.createdAt)}
          </p>
          <p className="flex items-center">
            <CalendarDays className="mr-1 h-4 w-4" />
            Cập nhật: {formatISO(company.updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanySection;
