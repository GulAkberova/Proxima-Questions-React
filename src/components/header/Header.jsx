import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import { signOut } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import "./header.css";

function Header() {
  const { user, role, loading } = useUser();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <NavLink to={"/"}>
        <img src="/proximaLogo.png" className="proxima_logo" alt="Proxima Logo" />
      </NavLink>

      <ul className="nav-links">
        <li>
          <NavLink to={"/"}>{t("home")}</NavLink>
        </li>
        <li>
          <NavLink to={"/questionsform"}>{t("questionform")}</NavLink>
        </li>
        {(role === "admin" || role === "superadmin") && (
          <li>
            <NavLink to={"/answer"}>{t("answer")}</NavLink>
          </li>
        )}
        {role === "superadmin" && (
          <li>
            <NavLink to={"/superuserdashboard"}>{t("superdashboard")}</NavLink>
          </li>
        )}
      </ul>

      <div className="header-right">
        <div className="language-selector">
          <select value={selectedLang} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="az">Azərbaycan</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="tr">Türkçe</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="user-dropdown">
            <div className="user-avatar" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {user.email.charAt(0).toUpperCase()}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p>{user.email}</p>
                <p>{t("status")}: {role}</p>
                <button onClick={handleLogout}>{t("logout")}</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
