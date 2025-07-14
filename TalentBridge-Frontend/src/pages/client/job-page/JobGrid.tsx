import type { Job } from "@/types/job";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/custom/LoadingSpinner";
import { EmptyState } from "@/components/custom/EmptyState";
import { useNavigate } from "react-router-dom";
import { formatISO, formatSalary } from "@/utils/convertHelper.ts";
import { levelColors, levelLabels } from "@/utils/tagColorMapper.ts";

type JobGridProps = {
  isLoading: boolean;
  jobs: Job[];
};

const JobGrid = ({ isLoading, jobs }: JobGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {isLoading && (
        <div className="col-span-3 flex min-h-[300px] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <div className="col-span-3 flex min-h-[300px] items-center justify-center">
          <EmptyState
            title="Không tìm thấy công việc nào"
            description="Thử thay đổi tiêu chí tìm kiếm hoặc xem các công việc khác"
            icon={<Building2 className="text-muted-foreground h-12 w-12" />}
          />
        </div>
      )}

      {jobs.map((job) => (
        <Card
          key={job.id}
          className="cursor-pointer bg-white transition-shadow duration-200 hover:shadow-lg"
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
          <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="line-clamp-2 flex-1 text-lg font-semibold text-gray-900">
                {job.name}
              </h3>
              <Badge className={`ml-2 flex-shrink-0 ${levelColors[job.level]}`}>
                {levelLabels[job.level]}
              </Badge>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                {job.company.logoUrl ? (
                  <img
                    src={job.company.logoUrl}
                    alt={`${job.company.name} logo`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-gray-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900">
                  {job.company.name}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span className="truncate">{job.location}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>Lương:</span>
                </div>
                <span className="font-medium text-green-500">
                  {formatSalary(job.salary)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="mr-1 h-4 w-4" />
                  <span>Số lượng:</span>
                </div>
                <span className="font-medium">{job.quantity} người</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Hạn nộp:</span>
                </div>
                <span className="font-medium text-black">
                  {formatISO(job.endDate)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 3).map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="bg-gray-100 text-xs text-gray-700"
                  >
                    {skill.name}
                  </Badge>
                ))}
                {job.skills.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-xs text-gray-700"
                  >
                    +{job.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>Đăng: {formatISO(job.startDate)}</span>
              </div>
              <div
                className={`rounded-full px-2 py-1 ${job.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {job.active ? "Đang tuyển" : "Đã đóng"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobGrid;
