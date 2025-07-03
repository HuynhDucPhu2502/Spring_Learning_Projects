import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "@/services/jobApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import type { Job } from "@/types/job";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JobSection from "./JobSection";
import { ApplySection } from "./ApplySection";

type JobDetailsProp = {
  initialJob?: Job;
};

const JobDetailsClientPage = ({ initialJob }: JobDetailsProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState<Job | undefined>(initialJob);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const res = (await getJobById(Number.parseInt(id))).data.data;
        setJob(res);
      } catch (err) {
        toast.error(getErrorMessage(err, "Không thể lấy thông tin công việc"));
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialJob) fetchJob();
  }, [id, navigate, initialJob]);

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="w-full px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate("/jobs")}
                className="cursor-pointer"
              >
                Danh sách việc làm
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{job.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-8">
          <JobSection job={job} />
        </div>

        <ApplySection jobId={job.id} jobTitle={job.name} />
      </div>
    </div>
  );
};

export default JobDetailsClientPage;
