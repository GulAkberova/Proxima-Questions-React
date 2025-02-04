import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./home.css"; // CSS faylı

function Home() {
  const { t } = useTranslation();
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("local_allQuestions"));
    if (storedQuestions) {
      setAllQuestions(storedQuestions); // Read all questions from localStorage
    }
  }, []);
console.log(allQuestions,"allQuestionsallQuestions")



  return (
    <section className="home-container">
      <h1 className="home-title">{t("welcome")}</h1>

      <ul className="button-container">
        {Array.isArray(allQuestions) &&
          allQuestions.map((questionSet, idx) => {
            if (Array.isArray(questionSet)) {
              return questionSet.map((q, innerIdx) => {
                if (q.section === "company") {
                  return (
                    <Link to={`answer/form/${q.answers.q1}`}>
                    <li key={`${idx}-${innerIdx}`} className="custom-button agrovita">
                      {q.answers.q1 || "No answer"}
                    </li>
                    </Link>
                  );
                }
                return null;
              });
            }
            return 'aaa'; 
          })}
      </ul>
    
    </section>
    
  );
}

export default Home;
