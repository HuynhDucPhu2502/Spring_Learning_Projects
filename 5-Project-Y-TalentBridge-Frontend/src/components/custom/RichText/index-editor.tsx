import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ImageInsertModal from "./ImageInsertModal";
import styles from "./RichTextEditor.module.css";

export default function RichTextEditor() {
  const [content, setContent] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * In ra d li u HTML hi n t i
   */
  /*******  096921f6-814a-4eef-b91b-6858e5f6e6ca  *******/
  const handleSave = () => {
    console.log("Dữ liệu HTML:", content);
  };

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
    [imageHandler]
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
      <div className="max-w-[800px] mx-auto space-y-4 my-12">
        <h2 className="text-xl font-semibold">Nhập mô tả</h2>

        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="Nhập mô tả sản phẩm..."
          theme="snow"
          className={`prose max-w-none  ${styles.quillEditor}`}
        />

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleSave}
        >
          Lưu nội dung
        </button>
      </div>

      {showImageModal && (
        <ImageInsertModal
          editor={quillRef.current?.getEditor() ?? null}
          onCancel={() => setShowImageModal(false)}
        />
      )}
    </>
  );
}
