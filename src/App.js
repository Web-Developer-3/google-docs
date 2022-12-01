import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "./style.css";
import { app, db } from "./firebaseConfig";
import Home from "./components/Home";
import Editor from "./components/Editor";

const App = () => {
  return (
    <div className="App">
      Google Docs Clone
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home database={db} />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </div>
  );
};

export default App;
