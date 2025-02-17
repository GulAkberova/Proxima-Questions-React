import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { tableContext } from "./components/TableContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Agrovita from "./components/agrovita/Agrovita";
import QuestionsForm from "./components/questionsform/QuestionsForm";
import Answerform from "./components/answerform/Answerform";
import FirestoreTest from "./components/test/FirestoreTest";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Answer from "./components/answer/Answer";
import UserRole from "./auth/UserRole";
import SuperuserDashboard from "./superuser/SuperuserDashboard";

function App() {
  let { all, setAll, value, setValue, loading, setLoading } =
    useContext(tableContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://northwind.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAll(data);
        setLoading(false);
      });
  }, [value]);
  const { user } = useAuth();
  // console.log(user, "user");
  return (
    <>
  
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Qeydiyyatdan keçmiş istifadəçilər üçün */}
        <Route
          path="/questionsform"
          element={
            <ProtectedRoute requiredRole="user">
              <QuestionsForm />
            </ProtectedRoute>
          }
        />

        {/* Yalnız adminlər üçün */}
        <Route
          path="/superuserdashboard"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperuserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agrovita"
          element={
            <ProtectedRoute requiredRole="admin">
              <Agrovita />
            </ProtectedRoute>
          }
        />

        {/* Adminlər üçün xüsusi səhifə */}
        <Route
          path="/answer"
          element={
            <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
              <Answer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/answer/form/:id"
          element={
            <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
              <Answerform />
            </ProtectedRoute>
          }
        />

        {/* Bütün istifadəçilər üçün açıq səhifələr */}
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Logout /> */}
      {/* <UserRole /> */}
    </>
  );
}

export default App;
