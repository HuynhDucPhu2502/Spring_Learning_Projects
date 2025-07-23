import { getErrorMessage } from "@/features/slices/auth/authThunk";
import type { RecruiterInfoResponseDto } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { MemberTable } from "./MemberTable";
import {
  addMemberToCompany,
  findAllRecruitersBySelfCompany,
  removeMemberFromCompany,
} from "@/services/companyApi";
import MemberInviteFrom from "./MemberInviteFrom";
import { useAppSelector } from "@/features/hooks";

const MemberManagePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Data State
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<RecruiterInfoResponseDto[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  // ============================
  // HANDLE FETCHING DATA
  // ============================
  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = (await findAllRecruitersBySelfCompany()).data.data;
      setMembers(res);

      const owner = res.find((m) => m.owner);
      setIsOwner(owner?.email === user?.email);
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // ============================
  // HANDLE ADD MEMBER
  // ============================
  const addMember = async (email: string) => {
    setIsLoading(true);
    try {
      await addMemberToCompany({ email: email });
      await fetchMembers();
      toast.success("Thêm thành viên mới thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // HANDLE ADD MEMBER
  // ============================
  const removeMember = async (email: string) => {
    setIsLoading(true);
    try {
      await removeMemberFromCompany({ email: email });
      await fetchMembers();
      toast.success("Thêm thành viên mới thành công");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Đội ngũ tuyển dụng của công ty bạn
        </h2>
      </div>

      <div className="rounded-lg bg-blue-50/50 px-6 py-4 shadow">
        <MemberInviteFrom onSubmit={addMember} />
        <p className="mt-2 text-sm text-gray-500">
          Mời thêm thành viên mới vào đội ngũ tuyển dụng.
        </p>
      </div>

      <div>
        <MemberTable
          isLoading={isLoading}
          users={members}
          onDelete={removeMember}
          isOwner={isOwner}
        />
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-3">
        <span className="font-bold text-purple-700">Lưu ý:</span>
        <span>
          Chỉ chủ sở hữu quản lý tuyển dụng (OWNER) mới có quyền loại bỏ thành
          viên khỏi đội ngũ tuyển dụng.
        </span>
      </div>
    </div>
  );
};

export default MemberManagePage;
