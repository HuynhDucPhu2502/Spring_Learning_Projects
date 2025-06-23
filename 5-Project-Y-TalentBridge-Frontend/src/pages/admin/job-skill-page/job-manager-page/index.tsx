import { Briefcase } from "lucide-react";

export function JobManagerPanel() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Briefcase className="h-16 w-16 text-muted-foreground mb-6" />
      <h3 className="text-xl font-semibold mb-2">Manage Jobs</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        Tính năng quản lý công việc đang được phát triển. Vui lòng quay lại sau
        để sử dụng tính năng này.
      </p>
      <div className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
        🚧 Coming Soon...
      </div>
    </div>
  );
}
