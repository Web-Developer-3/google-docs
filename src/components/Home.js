import { Button } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

const Home = ({ database }) => {
  let dataCollection = collection(database, "docs-data");
  let auth = getAuth();
  let userEmail = localStorage.getItem("userEmail");
  let navigate = useNavigate();

  const [isAdd, setIsAdd] = useState(false);
  const [docsData, setDocsData] = useState([]);
  const [title, setTitle] = useState("");

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    onSnapshot(dataCollection, (response) => {
      setDocsData(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      console.log(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  const triggerModal = () => {
    if (isAdd === false) {
      setIsAdd(true);
    } else {
      setIsAdd(false);
    }
  };

  const addDocument = () => {
    addDoc(dataCollection, {
      title: title,
      author: userEmail,
      body: "",
    })
      .then((response) => {
        setIsAdd(false);
        setTitle("");
        successToast();
      })
      .catch(() => {
        errorToast();
      });
  };

  const successToast = () =>
    toast.success("Wow So Easy", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorToast = () =>
    toast.error("Error! Doc Cannot Be Added!!!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  console.log(title);

  const openEditor = (id) => {
    navigate(`/editor/${id}`);
  };
  return (
    <div>
      <div className="logout-container">
        <button onClick={logout} className="logout-btn">
          Log Out
        </button>
      </div>
      <Button
        onClick={triggerModal}
        variant="outlined"
        color="primary"
        startIcon={<AddRounded />}
      >
        Add Document
      </Button>
      {isAdd === true ? (
        <div className="title-input" value={isAdd}>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
            placeholder="Add A Title"
            className="add-title"
          />
          <button
            style={{
              width: 75,
              background: "#212121",
              color: "#fff",
              border: "none",
              borderRadius: "7px",
              marginLeft: "10px",
              height: 50,
              cursor: "pointer",
            }}
            onClick={addDocument}
          >
            Add
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="grid-main">
        {docsData.map((doc) => {
          return (
            <div
              key={doc.id}
              className="grid-child"
              onClick={() => openEditor(doc.id)}
            >
              <h3>{doc.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
