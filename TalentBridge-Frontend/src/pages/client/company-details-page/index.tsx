import LoadingSpinner from "@/components/custom/LoadingSpinner.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { getErrorMessage } from "@/features/slices/auth/authThunk.ts";
import { findCompanyById } from "@/services/companyApi.ts";
import { findJobByCompanyId } from "@/services/jobApi.ts";
import type { DefaultCompanyResponseDto } from "@/types/company.d.ts";
import type { Job } from "@/types/job";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CompanySection from "../../commons/company-details-components/CompanySection.tsx";
import JobsSection from "../../commons/company-details-components/JobsSection.tsx";

type CompanyDetailsProp = {
  initialCompany?: DefaultCompanyResponseDto;
};

const CompanyDetailsClientPage = ({ initialCompany }: CompanyDetailsProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState<DefaultCompanyResponseDto | undefined>(
    initialCompany,
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchCompany = async () => {
      setIsLoading(true);
      try {
        const res = (await findCompanyById(parseInt(id))).data.data;
        const jobRes = (await findJobByCompanyId(parseInt(id))).data.data;
        setCompany(res);
        setJobs(jobRes || []);
      } catch (err) {
        toast.error(getErrorMessage(err, "Không thể lấy thông tin công ty"));
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialCompany) fetchCompany();
  }, [id, navigate, initialCompany]);

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!company) return null;

  return (
    <div
      className={`mx-auto my-12 ${jobs && jobs.length > 0 ? "w-4/5" : "w-3/5"}`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate("/companies")}
              className="cursor-pointer"
            >
              Danh sách công ty
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Công ty {company.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <CompanySection company={company} jobsCount={jobs.length} />

        <JobsSection jobs={jobs} />
      </div>
    </div>
  );
};

export default CompanyDetailsClientPage;
