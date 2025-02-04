import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./questionform.css";

const QuestionsForm = () => {
  const { t } = useTranslation();
  const questionsData = t("questions", { returnObjects: true }) || {};
  console.log(questionsData, "questionsData");

  const sections = Object.keys(questionsData).map((key) => ({
    key,
    label: t(`sections.${key}`, { defaultValue: key }),
  }));
  console.log(sections, "sections");

  const [activeTab, setActiveTab] = useState(
    sections.length > 0 ? sections[0].key : ""
  );
  const [answers, setAnswers] = useState({});
  const [allQuestions, setAllQuestions] = useState([]);
  const [localAllQuestions, setLocalAllQuestions] = useState([]);

  // console.log(allQuestions, "allQuestions");

  const handleInputChange = (section, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: { ...prev[section], [question]: value },
    }));
  };

  const handleAddForm = () => {
    const newQuestions = [];

    Object.keys(questionsData).forEach((sectionKey) => {
      const sectionAnswers = answers[sectionKey] || {};
      const newQuestion = {
        id: new Date().toISOString(),
        section: sectionKey,
        answers: {},
      };

      Object.keys(questionsData[sectionKey]).forEach((questionKey) => {
        newQuestion.answers[questionKey] = sectionAnswers[questionKey] || "";
      });

      newQuestions.push(newQuestion);
    });

    setLocalAllQuestions((prev) => {
      const updatedLocalQuestions = [...prev, newQuestions];
      localStorage.setItem(
        "local_allQuestions",
        JSON.stringify(updatedLocalQuestions)
      );
      return updatedLocalQuestions;
    });

    setAllQuestions(newQuestions);

    setAnswers({});
  };

  useEffect(() => {
    const storedLocalQuestions = JSON.parse(
      localStorage.getItem("local_allQuestions")
    );
    if (storedLocalQuestions) {
      setLocalAllQuestions(storedLocalQuestions);
    }
  }, []);

  return (
    <div className="container">
      <div className="questionform">
        {sections.map((sec) => (
          <button
            key={sec.key}
            className={activeTab === sec.key ? "active" : ""}
            onClick={() => setActiveTab(sec.key)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {questionsData[activeTab] ? (
          Object.keys(questionsData[activeTab]).map((questionKey, idx) => (
            <div key={idx} className="input-group">
              <label>
                <div></div>
                {questionsData[activeTab][questionKey]}
              </label>
              <input
                type="text"
                value={answers[activeTab]?.[questionKey] || ""}
                onChange={(e) =>
                  handleInputChange(activeTab, questionKey, e.target.value)
                }
              />
            </div>
          ))
        ) : (
          <p>Yüklənir...</p>
        )}
      </div>
      <div className="add_questionform">
        <button onClick={handleAddForm}>Add to All Questions</button>
      </div>
    </div>
  );
};

export default QuestionsForm;
