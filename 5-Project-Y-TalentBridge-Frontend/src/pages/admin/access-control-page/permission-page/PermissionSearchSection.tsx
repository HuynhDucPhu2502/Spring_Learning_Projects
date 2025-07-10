import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PermissionSearchSectionProps {
  searchName: string;
  setSearchName: (value: string) => void;
  searchApiPath: string;
  setsearchApiPath: (value: string) => void;
  onReset: () => void;
}

export function PermissionSearchSection({
  searchName,
  setSearchName,
  searchApiPath,
  setsearchApiPath,
  onReset,
}: PermissionSearchSectionProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search-name">Tên phân quyền:</Label>
          <Input
            id="search-name"
            placeholder="Nhập tên phân quyền..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="search-api-path">Đường dẫn API:</Label>
          <Input
            id="search-api-path"
            placeholder="Nhập đường dẫn API..."
            value={searchApiPath}
            onChange={(e) => setsearchApiPath(e.target.value)}
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
}
