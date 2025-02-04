
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const savedEditorHtml = localStorage.getItem("editorContentV3");
    if (savedEditorHtml) {
      setEditorHtml(savedEditorHtml);
    }
    setIsLoaded(true);
  }, []);

  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
  };

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("editorContentV3", editorHtml);
    }
  }, [editorHtml, isLoaded]);

  return (
    <div 
      className="h-50 p-5 bg-teal-50 
      border border-teal-100 rounded-lg"
    >
      <div className="border border-teal-200 rounded-md overflow-hidden">
        <ReactQuill
          value={editorHtml}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          className="h-100 text-gray-900 
          [&_.ql-editor]:min-h-[200px] 
          [&_.ql-toolbar]:bg-teal-100 
          [&_.ql-toolbar]:border-b 
          [&_.ql-toolbar]:border-teal-200"
          theme="snow"
        />
      </div>
    </div>
  );
};

// Customize modules and formats as needed
const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = ["bold", "italic", "underline", "list"];

export default RichTextEditor;


