import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface MemberInviteFromProps {
  onSubmit: (email: string) => void;
}

const MemberInviteFrom = ({ onSubmit }: MemberInviteFromProps) => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="email-input">Nhập tên email:</Label>
          <Input
            id="email-input"
            placeholder="Nhập tên email.."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-purple-500 hover:bg-purple-600"
            onClick={() => onSubmit(userEmail)}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberInviteFrom;
