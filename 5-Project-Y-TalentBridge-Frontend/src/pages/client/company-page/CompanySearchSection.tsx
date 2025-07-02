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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-end justify-center gap-4 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-2">
          <Label htmlFor="search-name" className="font-medium text-gray-700">
            Tên công ty:
          </Label>
          <Input
            id="search-name"
            placeholder="nhập tên tìm"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <Label htmlFor="search-address" className="font-medium text-gray-700">
            Địa chỉ công ty:
          </Label>
          <div className="flex gap-2">
            <Input
              id="search-address"
              placeholder="nhập địa chỉ"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="flex-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchAddress("Hồ Chí Minh")}
                className="border-gray-300 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                HCM
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchAddress("Hà Nội")}
                className="border-gray-300 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                HN
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchAddress("Đà Nẵng")}
                className="border-gray-300 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                ĐN
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onReset}
            className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Làm lại
          </Button>
        </div>
      </div>
    </div>
  );
}
