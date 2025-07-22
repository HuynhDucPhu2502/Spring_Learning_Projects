"use client";

import type { Job } from "@/types/job";
import {
  Building2,
  MapPin,
  CalendarDays,
  DollarSign,
  Users,
  Clock,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import RichTextPreview from "@/components/custom/RichText/index-preview.tsx";
import { formatISO, formatSalary } from "@/utils/convertHelper.ts";
import { levelColors, levelLabels } from "@/utils/tagColorMapper.ts";

type JobSectionProps = {
  job: Job;
};

const JobSection = ({ job }: JobSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Job Header */}
      <div className="space-y-4">
        <div className="flex h-[200px] items-center gap-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {job.name}
            </h1>
            <div className="mb-4 flex items-center gap-4">
              <Badge className={`${levelColors[job.level]}`}>
                {levelLabels[job.level]}
              </Badge>
              <div
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  job.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {job.active ? "Đang tuyển dụng" : "Đã đóng"}
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border bg-white">
            {job.company.logoUrl ? (
              <img
                src={job.company.logoUrl || "/placeholder.svg"}
                alt={job.company.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 className="h-8 w-8 text-gray-600" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {job.company.name}
            </h2>
            <p className="flex items-center text-gray-600">
              <MapPin className="mr-1 h-4 w-4" />
              {job.company.address}
            </p>
          </div>
        </div>
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-gray-900">Địa điểm làm việc</span>
          </div>
          <p className="text-gray-700">{job.location}</p>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-gray-900">Mức lương</span>
          </div>
          <p className="font-semibold text-gray-700">
            {formatSalary(job.salary)}
          </p>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-gray-900">Số lượng tuyển</span>
          </div>
          <p className="text-gray-700">{job.quantity} người</p>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-gray-900">Hạn nộp hồ sơ</span>
          </div>
          <p className="font-semibold text-red-600">{formatISO(job.endDate)}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Briefcase className="h-5 w-5 text-orange-600" />
          Kỹ năng yêu cầu
        </h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="bg-orange-100 text-orange-700"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Job Description */}
      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Mô tả công việc
        </h3>
        <RichTextPreview content={job.description} />
      </div>

      {/* Job Dates */}
      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Thông tin thời gian
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-600" />
            <span className="text-gray-600">Ngày đăng:</span>
            <span className="font-medium">{formatISO(job.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-600" />
            <span className="text-gray-600">Hạn nộp:</span>
            <span className="font-medium text-red-600">
              {formatISO(job.endDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
