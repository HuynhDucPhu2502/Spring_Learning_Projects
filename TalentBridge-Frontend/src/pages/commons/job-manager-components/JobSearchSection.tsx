import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

interface JobSearchSectionProps {
  searchName: string;
  searchCompanyName?: string;
  searchLevel: string;
  searchLocation: string;
  isExpanded: boolean;
  onReset: () => void;
  onExpandToggle: () => void;
  onChange: {
    name: (val: string) => void;
    company?: (val: string) => void;
    level: (val: string) => void;
    location: (val: string) => void;
  };
}

export function JobSearchSection({
  searchName,
  searchCompanyName,
  searchLevel,
  searchLocation,
  isExpanded,
  onReset,
  onExpandToggle,
  onChange,
}: JobSearchSectionProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search-title">Tên công việc:</Label>
          <Input
            id="search-title"
            placeholder="Nhập tên công việc..."
            value={searchName}
            onChange={(e) => onChange.name(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Làm lại
          </Button>
          <Button variant="outline" onClick={onExpandToggle}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Thu gọn
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Mở rộng
              </>
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="my-4" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {typeof onChange.company === "function" && (
              <div className="space-y-2">
                <Label htmlFor="search-company">Công ty:</Label>
                <Input
                  id="search-company"
                  placeholder="Tên công ty..."
                  value={searchCompanyName ?? ""}
                  onChange={(e) => onChange.company?.(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="search-level">Level:</Label>
              <Select value={searchLevel} onValueChange={onChange.level}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="INTERN">Intern</SelectItem>
                  <SelectItem value="FRESHER">Fresher</SelectItem>
                  <SelectItem value="MIDDLE">Middle</SelectItem>
                  <SelectItem value="SENIOR">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search-location">Địa điểm:</Label>
              <Input
                id="search-location"
                placeholder="Nhập địa điểm..."
                value={searchLocation}
                onChange={(e) => onChange.location(e.target.value)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
