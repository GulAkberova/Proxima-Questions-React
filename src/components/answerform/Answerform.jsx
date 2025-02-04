import React, { useEffect, useState } from "react";
import "./answerform.css";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Answerform() {
  const { t } = useTranslation();
  const params = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editableAnswers, setEditableAnswers] = useState({});

  useEffect(() => {
    const storedQuestions = JSON.parse(
      localStorage.getItem("local_allQuestions")
    );
    if (storedQuestions) {
      setAllQuestions(storedQuestions);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      const filtered = allQuestions.filter(
        (questionSet) => questionSet[0]?.answers.q1 === params.id
      );
      setFilteredQuestions(filtered);
    }
  }, [params.id, allQuestions]);

  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const sectionsArray = filteredQuestions[0].map((q) => ({
        label: t(`sections.${q.section}`, { defaultValue: q.section }),
        key: q.section,
      }));
      setSections(sectionsArray);
    }
  }, [filteredQuestions, t]);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const getTranslatedQuestion = (section, key) => {
    return t(`questions.${section}.${key}`, { defaultValue: key });
  };

  const handleEditClick = (section, key) => {
    setEditableAnswers((prev) => ({
      ...prev,
      [`${section}-${key}`]: !prev[`${section}-${key}`],
    }));
  };

  const handleInputChange = (e, section, key) => {
    const { value } = e.target;

    setAllQuestions((prevQuestions) =>
      prevQuestions.map((questionSet) => {
        if (questionSet[0]?.answers.q1 === params.id) {
          return questionSet.map((q) => {
            if (q.section === section && q.answers[key] !== undefined) {
              return { ...q, answers: { ...q.answers, [key]: value } };
            }
            return q;
          });
        }
        return questionSet;
      })
    );
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      localStorage.setItem("local_allQuestions", JSON.stringify(allQuestions));
    }
  }, [allQuestions]);

  return (
    <div className="container">
      <div className="answerform">
        {sections.map((sec, idx) => (
          <button
            key={sec.key}
            className={`tab-button ${selectedTab === idx ? "active" : ""}`}
            onClick={() => handleTabChange(idx)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {filteredQuestions.map((questionSet, idx) =>
          questionSet
            .filter((q) => q.section === sections[selectedTab]?.key)
            .map((q, questionIdx) => (
              <div key={questionIdx}>
                {/* <h3>
                  {t(`sections.${q.section}`, { defaultValue: q.section })}
                </h3> */}
                <div>
                  {Object.entries(q.answers).map(
                    ([answerKey, answer], answerIdx) => (
                      <div key={answerIdx} className="input-group-answer">
                        <label>
                        <div></div>
                          {getTranslatedQuestion(q.section, answerKey)}:
                        </label>
                        <div>
                          <input
                            type="text"
                            value={answer || ""}
                            readOnly={
                              !editableAnswers[`${q.section}-${answerKey}`]
                            }
                            onChange={(e) =>
                              handleInputChange(e, q.section, answerKey)
                            }
                            className="readonly-input"
                          />
                          <button
                            onClick={() =>
                              handleEditClick(q.section, answerKey)
                            }
                            className="edit-button"
                          >
                            {editableAnswers[`${q.section}-${answerKey}`]
                              ? "🦾"
                              : "✏️"}
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Answerform;
