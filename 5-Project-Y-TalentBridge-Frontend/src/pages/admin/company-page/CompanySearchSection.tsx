import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Props = {
  searchName: string;
  setSearchName: (val: string) => void;
  searchAddress: string;
  setSearchAddress: (val: string) => void;
  onReset: () => void;
};

export function CompanySearchSection({
  searchName,
  setSearchName,
  searchAddress,
  setSearchAddress,
  onReset,
}: Props) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="search-name">Tên công ty:</Label>
          <Input
            id="search-name"
            placeholder="nhập tên tìm"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="search-address">Địa chỉ công ty:</Label>
          <Input
            id="search-address"
            placeholder="nhập địa chỉ"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
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
