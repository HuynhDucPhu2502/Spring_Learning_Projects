import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ResumeForDisplayResponseDto } from "@/types/resume";
import PDFViewer from "@/components/custom/PDFViewer";
import { FileX, MapPin, Sparkles } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/custom/DeleteConfirmationDialog";
import JobInfoDialog from "./JobInfoDialog";
import { UpdateResumeDialog } from "./UpdateResumeDialog";
import { formatISO } from "@/utils/convertHelper.ts";
import { Badge } from "@/components/ui/badge";

type Props = {
  resume: ResumeForDisplayResponseDto;
  onDelete: (jobId: number) => void;
  onUpdateResumeFile: (resumeId: number, file: File) => Promise<void>;
};

export default function ResumeCard({
  resume,
  onDelete,
  onUpdateResumeFile,
}: Props) {
  const submitUpdatedResumeFile = async (file: File) => {
    await onUpdateResumeFile(resume.id, file);
  };

  return (
    <>
      <Card className="flex flex-col transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            {resume.company.logoUrl && (
              <img
                src={resume.company.logoUrl}
                alt={resume.company.name}
                className="h-14 w-14 rounded-md border bg-white object-contain shadow-sm"
              />
            )}
            <div>
              <CardTitle className="text-lg leading-tight font-semibold">
                {resume.job.name}
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                {resume.company.name}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Địa điểm làm việc
              </p>
              <p className="text-sm text-gray-600">{resume.job.location}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 text-gray-500" />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-700">
                Kỹ năng yêu cầu
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {resume.job.skills.map((skill) => (
                  <Badge
                    key={`${resume.id}-${skill}`}
                    className="bg-orange-100 text-orange-700"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-2 text-xs text-gray-500">
            <span>Nộp: {formatISO(resume.createdAt)}</span>
            <span>Cập nhật: {formatISO(resume.updatedAt)}</span>
          </div>

          {resume.pdfUrl && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                CV đã nộp
              </p>
              <div
                className="overflow-auto rounded-md border"
                style={{ height: "500px" }}
              >
                <PDFViewer fileUrl={resume.pdfUrl} />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="mt-auto flex justify-end gap-2">
          <JobInfoDialog
            job={resume.job}
            companyName={resume.company.name}
            location={resume.job.location}
          />

          <UpdateResumeDialog onSubmitFile={submitUpdatedResumeFile} />

          <DeleteConfirmDialog
            onConfirm={() => onDelete(resume.job.id)}
            title="Rút hồ sơ"
            description="Bạn có chắc chắn muốn rút hồ sơ không? Thao tác này không thể thu hồi"
          >
            <Button className="bg-red-600 py-3 font-semibold text-white hover:bg-red-700">
              <FileX className="mr-2 h-4 w-4" />
              Rút hồ sơ
            </Button>
          </DeleteConfirmDialog>
        </CardFooter>
      </Card>
    </>
  );
}
