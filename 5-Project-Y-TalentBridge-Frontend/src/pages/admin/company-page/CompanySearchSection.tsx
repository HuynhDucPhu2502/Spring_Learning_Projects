import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";

type Props = {
  searchName: string;
  setSearchName: (val: string) => void;
  searchAddress: string;
  setSearchAddress: (val: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

export function CompanySearchSection({
  searchName,
  setSearchName,
  searchAddress,
  setSearchAddress,
  onSearch,
  onReset,
}: Props) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="search-name">Name:</Label>
          <Input
            id="search-name"
            placeholder="nhập tên tìm"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="search-address">Address:</Label>
          <Input
            id="search-address"
            placeholder="nhập địa chỉ"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Làm lại
          </Button>
        </div>
      </div>
    </div>
  );
}
