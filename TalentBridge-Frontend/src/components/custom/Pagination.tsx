import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalElements: number;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  showItemsPerPageSelect?: boolean;
  theme?: "blue" | "purple";
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  totalPages,
  totalElements,
  showItemsPerPageSelect,
  theme = "blue",
}: PaginationProps) => {
  const pagination = () => {
    if (totalPages <= 1) return [1];

    const center: (number | string)[] = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ],
      filteredCenter = center.filter(
        (p) => (p as number) > 1 && (p as number) < totalPages,
      ),
      includeThreeLeft = currentPage === 5,
      includeThreeRight = currentPage === totalPages - 4,
      includeLeftDots = currentPage > 5,
      includeRightDots = currentPage < totalPages - 4;

    if (includeThreeLeft) filteredCenter.unshift(2);
    if (includeThreeRight) filteredCenter.push(totalPages - 1);

    if (includeLeftDots) filteredCenter.unshift("...");
    if (includeRightDots) filteredCenter.push("...");

    return [1, ...filteredCenter, totalPages];
  };

  const pages = pagination();

  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-sm">
        {(currentPage - 1) * itemsPerPage + 1} –{" "}
        {Math.min(currentPage * itemsPerPage, totalElements)} trên{" "}
        {totalElements} dòng
      </div>
      <div className="flex items-center gap-4">
        {showItemsPerPageSelect && (
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </Button>

          {pages.map((page, index) =>
            typeof page === "string" && page === "..." ? (
              <span key={index}>...</span>
            ) : (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  if ((page as number) === currentPage) return;
                  setCurrentPage(page as number);
                }}
                className={
                  page === currentPage
                    ? `${theme === "blue" ? "bg-blue-600" : "bg-purple-600"} text-white opacity-100`
                    : ""
                }
              >
                {page}
              </Button>
            ),
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
