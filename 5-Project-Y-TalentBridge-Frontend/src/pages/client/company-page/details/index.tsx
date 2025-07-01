import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyById } from "@/services/companyApi";
import { get3RecentJobByCompanyId } from "@/services/jobApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";
import JobsSection from "./JobsSection";
import CompanySection from "./CompanySection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type CompanyDetailsProp = {
  initialCompany?: Company;
};

const CompanyDetails = ({ initialCompany }: CompanyDetailsProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState<Company | undefined>(initialCompany);
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
        const res = (await getCompanyById(parseInt(id))).data.data;
        const jobRes = (await get3RecentJobByCompanyId(parseInt(id))).data.data;
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
    <div className="w-full px-6 py-12">
      <div className="mx-auto max-w-7xl">
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
    </div>
  );
};

export default CompanyDetails;
