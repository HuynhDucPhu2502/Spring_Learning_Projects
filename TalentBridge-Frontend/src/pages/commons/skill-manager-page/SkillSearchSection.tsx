import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

interface SkillSearchSectionProps {
  searchName: string;
  setSearchName: (value: string) => void;
  onReset: () => void;
}

export function SkillSearchSection({
  searchName,
  setSearchName,
  onReset,
}: SkillSearchSectionProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="search-skill-name">Tên kỹ năng:</Label>
          <Input
            id="search-skill-name"
            placeholder="Nhập tên kỹ năng..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
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
