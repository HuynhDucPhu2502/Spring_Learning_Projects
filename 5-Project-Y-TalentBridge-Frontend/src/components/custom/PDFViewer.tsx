import { Viewer, type Plugin } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  className = "h-full w-full",
}) => {
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
        <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance as Plugin]} />
      </div>
    </div>
  );
};

export default PDFViewer;
