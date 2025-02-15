import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: "2" }, { header: "3" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image"],
    ],
  };

  return (
    <ReactQuill dir="rtl" value={value} onChange={onChange} modules={modules} />
  );
};

export default Editor;
