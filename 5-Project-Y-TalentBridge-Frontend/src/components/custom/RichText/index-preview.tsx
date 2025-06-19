import DOMPurify from "dompurify";

interface Props {
  content: string;
}

const RichTextPreview = ({ content }: Props) => {
  return (
    <>
      <h3 className="text-lg font-medium">Preview</h3>
      <div
        className="prose max-w-none border border-gray-300 p-4 rounded bg-white"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </>
  );
};

export default RichTextPreview;
