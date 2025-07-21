"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  deleteSkillById,
  getSkillsList,
  saveSkill,
  updateSkill,
} from "@/services/skillApi";
import type {
  createSkillRequestDto,
  DefaultSkillResponseDto,
  updateSkillRequestDto,
} from "@/types/skill.d.ts";
import Pagination from "@/components/custom/Pagination";
import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { SkillForm } from "./SkillForm";
import { SkillSearchSection } from "./SkillSearchSection";
import { SkillTable } from "./SkillTable";

const SkillManagerPage = () => {
  // Data
  const [skills, setSkills] = useState<DefaultSkillResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search
  const [searchName, setSearchName] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<DefaultSkillResponseDto | null>(null);

  // ============================
  // HANDLE OPEN FORM
  // ============================
  const openEditForm = (skill: DefaultSkillResponseDto) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingSkill(null);
    setIsFormOpen(true);
  };

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchSkills = async (
    page: number,
    size: number,
    searchName: string,
  ) => {
    setIsLoading(true);
    try {
      const filter = searchName ? `name ~ '*${searchName}*'` : null;
      const res = (await getSkillsList({ page, size, filter })).data.data;

      setSkills(res.content);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể lấy danh sách kỹ năng."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills(currentPage, itemsPerPage, searchName);
  }, [currentPage, itemsPerPage, searchName]);

  // ============================
  // HANDLE RESET
  // ============================
  const handleReset = () => {
    setSearchName("");
    setCurrentPage(1);
    setIsFormOpen(false);
    setEditingSkill(null);

    fetchSkills(currentPage, itemsPerPage, searchName);
  };

  // ============================
  // HANDLE CREATE, UPDATE, DELETE
  // ============================
  const handleAddOrUpdateSkill = async (
    data: createSkillRequestDto | updateSkillRequestDto,
  ) => {
    try {
      if (!data) return;

      if ("id" in data) {
        await updateSkill(data);
        toast.success("Cập nhật kỹ năng thành công.");
      } else {
        await saveSkill(data);
        toast.success("Tạo kỹ năng thông.");
      }

      handleReset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại."));
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await deleteSkillById(id);
      toast.success("Xóa kỹ năng thành công.");
      handleReset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Xóa kỹ năng thất bại."));
    }
  };

  return (
    <div className="space-y-6">
      <SkillSearchSection
        searchName={searchName}
        setSearchName={setSearchName}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách Kỹ năng</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={openCreateForm}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm kỹ năng
        </Button>
      </div>

      <SkillTable
        skills={skills}
        isLoading={isLoading}
        onEdit={openEditForm}
        onDelete={handleDeleteSkill}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showItemsPerPageSelect={true}
      />

      <SkillForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddOrUpdateSkill}
        initialData={editingSkill}
        onCloseForm={() => setEditingSkill(null)}
      />
    </div>
  );
};

export default SkillManagerPage;
