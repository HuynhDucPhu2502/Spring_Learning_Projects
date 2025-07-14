"use client";

import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobSearchSectionProps {
  searchName: string;
  searchCompanyName: string;
  searchLevel: string;
  searchLocation: string;
  isExpanded: boolean;
  onReset: () => void;
  onExpandToggle: () => void;
  onChange: {
    name: (val: string) => void;
    company: (val: string) => void;
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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search-title" className="font-medium text-gray-700">
            Tên công việc:
          </Label>
          <Input
            id="search-title"
            placeholder="Nhập tên công việc..."
            value={searchName}
            onChange={(e) => onChange.name(e.target.value)}
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onReset}
            className="border-orange-500 bg-transparent text-orange-600 hover:bg-orange-50 hover:text-orange-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Làm lại
          </Button>
          <Button
            variant="outline"
            onClick={onExpandToggle}
            className="border-gray-300 bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
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
            <div className="space-y-2">
              <Label
                htmlFor="search-company"
                className="font-medium text-gray-700"
              >
                Công ty:
              </Label>
              <Input
                id="search-company"
                placeholder="Tên công ty..."
                value={searchCompanyName}
                onChange={(e) => onChange.company(e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="search-level"
                className="font-medium text-gray-700"
              >
                Level:
              </Label>
              <Select value={searchLevel} onValueChange={onChange.level}>
                <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
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
              <Label
                htmlFor="search-location"
                className="font-medium text-gray-700"
              >
                Địa điểm:
              </Label>
              <div className="flex gap-2">
                <Input
                  id="search-location"
                  placeholder="Nhập địa điểm..."
                  value={searchLocation}
                  onChange={(e) => onChange.location(e.target.value)}
                  className="flex-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onChange.location("TP. Hồ Chí Minh")}
                    className="border-gray-300 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  >
                    HCM
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onChange.location("Hà Nội")}
                    className="border-gray-300 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  >
                    HN
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onChange.location("Đà Nẵng")}
                    className="border-gray-300 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  >
                    ĐN
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
