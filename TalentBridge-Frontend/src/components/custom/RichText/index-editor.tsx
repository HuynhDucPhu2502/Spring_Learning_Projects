import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ImageInsertModal from "./ImageInsertModal";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập mô tả...",
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const imageHandler = useCallback(() => {
    setShowImageModal(true);
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler],
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "image",
  ];

  return (
    <>
      <div className="w-full">
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
          className="w-full [&_.ql-container]:min-h-[120px] [&_.ql-editor]:min-h-[120px]"
          style={{
            width: "100%",
          }}
        />
      </div>

      <ImageInsertModal
        open={showImageModal}
        editor={quillRef.current?.getEditor() ?? null}
        onCancel={() => setShowImageModal(false)}
      />
    </>
  );
}
