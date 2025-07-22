import { Badge } from "@/components/ui/badge.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import type { Job } from "@/types/job";
import { formatISO, formatSalary } from "@/utils/convertHelper.ts";
import { useNavigate } from "react-router-dom";

type JobsSection = {
  jobs: Job[];
};

const JobsSection = ({ jobs }: JobsSection) => {
  const navigate = useNavigate();

  return (
    <>
      {jobs.length > 0 && (
        <div className="my-[200px] md:col-span-1">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Công ty đang tuyển{" "}
            <span className="text-orange-500">{jobs.length} việc làm </span>
          </h2>
          <ScrollArea className="h-[800px]">
            <div className="space-y-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="cursor-pointer space-y-3 rounded-xl border bg-white p-6 shadow-sm"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <h3 className="text-lg font-bold text-orange-700">
                    {job.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <p>
                      <strong>Địa điểm:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Lương:</strong> {formatSalary(job.salary)}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {job.quantity}
                    </p>
                    <p>
                      <strong>Cấp bậc:</strong> {job.level}
                    </p>
                    <p>
                      <strong>Thời gian:</strong> {formatISO(job.startDate)} →{" "}
                      {formatISO(job.endDate)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        className="rounded-full bg-orange-100 text-orange-700"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default JobsSection;
