import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ResumeSearchSectionProps {
  searchCompanyName: string;
  setSearchCompanyName: (value: string) => void;
  searchJobName: string;
  setSearchJobName: (value: string) => void;
  onReset: () => void;
}

export const ResumeSearchSection = ({
  searchCompanyName,
  setSearchCompanyName,
  searchJobName,
  setSearchJobName,
  onReset,
}: ResumeSearchSectionProps) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search-company-name">Tên công ty:</Label>
          <Input
            id="search-company-name"
            placeholder="Nhập tên công ty..."
            value={searchCompanyName}
            onChange={(e) => setSearchCompanyName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="search-job-name">Tên công việc:</Label>
          <Input
            id="search-job-name"
            placeholder="Nhập tên công việc..."
            value={searchJobName}
            onChange={(e) => setSearchJobName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Làm lại
          </Button>
        </div>
      </div>
    </div>
  );
};
