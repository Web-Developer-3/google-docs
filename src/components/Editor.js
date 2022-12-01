import { Button } from "@material-ui/core";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";

const Editor = () => {
  let params = useParams();
  let dataCollection = collection(db, "docs-data");

  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");

  const getEditorData = (value) => {
    setEditorData(value);
  };

  // useEffect(() => {
  //   const updateDocument = setTimeout(() => {
  //     let docToUpdate = doc(dataCollection, params?.id);

  //     updateDoc(docToUpdate, {
  //       body: editorData,
  //     })
  //       .then(() => {
  //         toast.success("Data Updated", {
  //           autoClose: 200,
  //         });
  //       })
  //       .catch(() => {
  //         toast.error("Cannot Update Doc");
  //       });
  //   }, 1000);

  //   return () => clearTimeout(updateDocument);
  // }, [editorData]);

  useEffect(() => {
    const document = doc(dataCollection, params.id);
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title);
      setEditorData(docs.data().body);
    });
  }, []);

  const updateOnclick = () => {
    let docOnClickUpdate = doc(dataCollection, params?.id);

    updateDoc(docOnClickUpdate, {
      body: editorData,
    })
      .then(() => {
        toast.success("Data Updated", {
          autoClose: 200,
        });
      })
      .catch(() => {
        toast.error("Cannot Update Doc");
      });
  };

  return (
    <div>
      {title}
      <Button onClick={updateOnclick}>Save Changes</Button>
      <ReactQuill theme="snow" value={editorData} onChange={getEditorData} />
    </div>
  );
};

export default Editor;
