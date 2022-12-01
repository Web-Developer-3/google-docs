import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const Editor = () => {
  let params = useParams();

  const [editorData, setEditorData] = useState();

  const getEditorData = (value) => {
    setEditorData(value);
  };

  useEffect(() => {
    const updateDocument = setTimeout(() => {
      console.log(editorData);
    }, 1000);

    return clearTimeout(updateDocument)
  }, []);

  return (
    <div>
      <ReactQuill theme="snow" value={editorData} onChange={getEditorData} />
    </div>
  );
};

export default Editor;
