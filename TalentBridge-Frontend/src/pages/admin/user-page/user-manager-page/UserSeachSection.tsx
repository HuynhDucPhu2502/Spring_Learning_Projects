import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

interface UserSearchSectionProps {
  searchUserName: string;
  setSearchUserName: (value: string) => void;
  searchEmail: string;
  setSearchEmail: (value: string) => void;
  onReset: () => void;
}

export function UserSearchSection({
  searchUserName,
  setSearchUserName,
  searchEmail,
  setSearchEmail,
  onReset,
}: UserSearchSectionProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search-user-name">Tên người dùng:</Label>
          <Input
            id="search-user-name"
            placeholder="Nhập tên người dùng..."
            value={searchUserName}
            onChange={(e) => setSearchUserName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="search-email">Email:</Label>
          <Input
            id="search-email"
            placeholder="Nhập email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
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
