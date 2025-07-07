import { Viewer, type Plugin } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
  className?: string;
  versioning?: boolean;
}

// ========================
// fileUrl: nhận file PDF để hiển thị
// className: customize style div ngoài cùng
// versioning: bật tính năng versioning
// ==========================

const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  className = "h-full w-full",
  versioning = false,
}) => {
  const actualFileUrl =
    versioning && fileUrl ? fileUrl.split("?PDFViewerVersion=")[0] : fileUrl;

  // Plugins
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  if (!fileUrl) return null;

  return (
    <div
      className={`rpv-core__viewer flex flex-col border border-gray-300 ${className}`}
    >
      <div className="flex items-center border-b border-gray-200 bg-gray-100 p-2">
        <Toolbar />
      </div>

      <div className="flex-1 overflow-hidden">
        <Viewer
          fileUrl={actualFileUrl}
          plugins={[toolbarPluginInstance as Plugin]}
        />
      </div>
    </div>
  );
};

export default PDFViewer;
