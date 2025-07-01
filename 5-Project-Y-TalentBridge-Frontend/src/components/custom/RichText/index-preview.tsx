import DOMPurify from "dompurify";

interface Props {
  content: string;
  title?: string;
}

const RichTextPreview = ({ title, content }: Props) => {
  return (
    <>
      {title && <h1 className="text-2xl font-semibold">{title}</h1>}
      <div
        className="prose max-w-none rounded bg-white"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </>
  );
};

export default RichTextPreview;
