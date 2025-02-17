import React from "react";
import { useTranslation } from "react-i18next";
import "./home.css";

function Home() {
  const { t } = useTranslation();

  return (
    <section className="home-container">
      <h1 className="home-title">{t("welcome")}</h1>
    </section>
  );
}

export default Home;
