import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { tableContext } from "../TableContext";
import { useTranslation } from "react-i18next";
import "./header.css"; // CSS faylı

function Header() {
  let { favorite } = useContext(tableContext);
  const { t, i18n } = useTranslation();
  
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };

  return (
    <header className="header">
      
        <NavLink to={"/"}><img src="/proximaLogo.png" className="proxima_logo"/></NavLink>
     
      {/* <p>Current Language: {i18n.language}</p> */}

      <ul className="nav-links">
       
        <li>
          <NavLink to={"/"}>{t("home")}</NavLink>
        </li>
        <li>
          <NavLink to={"/questionsform"}>{t("questionform")}</NavLink>
        </li>
       
      </ul>

      {/* Dil seçimi üçün açılan menyu */}
      <div className="language-selector">
        <div className="custom-dropdown">
          <select value={selectedLang} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="az">Azərbaycan</option>
            <option value="en"> English</option>
            <option value="ru"> Русский</option>
            <option value="tr"> Türkce</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
