import { useState } from "react";
import type Quill from "quill";

interface Props {
  editor: Quill | null;
  onCancel: () => void;
}

export default function ImageInsertModal({ editor, onCancel }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleInsert = () => {
    if (editor && inputValue) {
      let range = editor.getSelection();

      if (!range) {
        editor.focus();
        const length = editor.getLength();
        editor.setSelection(length, 0);
        range = editor.getSelection();
      }

      const index = range?.index ?? 0;

      editor.insertEmbed(index, "image", inputValue, "user");
      editor.setSelection(index + 1);
      editor.focus();
    }

    setInputValue("");
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md space-y-4">
        <h2 className="font-semibold text-lg">Nhập URL ảnh</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 w-96"
          placeholder="https://example.com/image.jpg"
        />
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleInsert}
          >
            Chèn ảnh
          </button>
        </div>
      </div>
    </div>
  );
}
