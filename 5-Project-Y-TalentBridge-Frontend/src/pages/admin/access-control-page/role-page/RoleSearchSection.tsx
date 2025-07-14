import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RoleSearchSectionProps {
  searchRoleName: string;
  setSearchRoleName: (value: string) => void;
  onReset: () => void;
}

export function RoleSearchSection({
  searchRoleName,
  setSearchRoleName,
  onReset,
}: RoleSearchSectionProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="search-role-name">Tên chức vụ:</Label>
          <Input
            id="search-role-name"
            placeholder="Nhập tên chức vụ..."
            value={searchRoleName}
            onChange={(e) => setSearchRoleName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Làm lại
          </Button>
        </div>
      </div>
    </div>
  );
}
